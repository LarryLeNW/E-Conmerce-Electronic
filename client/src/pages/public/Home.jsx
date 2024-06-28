import { Sidebar, Banner, BestSeller, FeatureProducts } from "../../components";
import DealDaily from "../../components/DealDaily";
function Home() {
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto ">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8">
        <FeatureProducts />
      </div>
      <div className="h-[500px]"></div>
    </>
  );
}

export default Home;