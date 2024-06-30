import lable from "assets/label.png";
import SelectOption from "./SelectOption";
import ICONS from "utils/icons";
import { useState } from "react";
import { formatMoney, renderStars } from "utils/helper";
import { Link, generatePath } from "react-router-dom";
import path from "utils/path";

function Product({ data, isNew }) {
  const [isShowOption, setShowOption] = useState(false);

  return (
    <div className="w-full text-base pr-5 px-10">
      <Link
        className="w-full border p-[15px] flex flex-col items-center cursor-pointer"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setShowOption(false);
        }}
        to={generatePath(path.DETAIL_PRODUCT, {
          id: data?._id,
          title: data?.title,
        })}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex gap-2 justify-center animate-slide-top">
              <SelectOption icon={<ICONS.AiFillEye />} />
              <SelectOption icon={<ICONS.AiOutlineMenu />} />
              <SelectOption icon={<ICONS.BsFillSuitHeartFill />} />
            </div>
          )}

          <img
            src={
              data?.thumb ||
              "https://mmi-global.com/wp-content/uploads/2020/05/default-product-image.jpg"
            }
            alt={data.title}
            className="w-[243px] h-[243px]  object-cover"
          />
          <img
            src={lable}
            alt="lable"
            className={`absolute top-[-24px] left-[-38px] h-[60px] object-cover ${
              isNew ? "w-[100px]" : "w-[130px]"
            }`}
          />
          <span className="text-white absolute -rotate-12 top-[-8px] font-semibold left-[-12px]">
            {isNew ? "New" : "Trending"}
          </span>
        </div>

        {/* info */}
        <div className="flex flex-col gap-2 mt[15px] items-start w-full">
          <span className="line-clamp-1">{data?.title}</span>
          <span className="flex ">{renderStars(data?.totalRatings)}</span>
          <span>{formatMoney(data?.price)} VNĐ</span>
        </div>
      </Link>
    </div>
  );
}

export default Product;