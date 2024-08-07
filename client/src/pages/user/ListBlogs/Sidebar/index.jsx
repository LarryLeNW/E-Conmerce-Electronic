import { getBlogCategories } from "apis";
import withBaseComponent from "hocs";
import QueryString from "qs";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { setFilterParams } from "redux/slicers/common.slicer";
import ICONS from "utils/icons";
import path from "utils/path";

function Sidebar({ dispatch, useSelector }) {
  const [categories, setCategories] = useState([]);
  const [dataRender, setDataRender] = useState([]);
  const { filterParams } = useSelector((state) => state.common);
  const location = useLocation();

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      const response = await getBlogCategories();
      if (response?.success) {
        setCategories(response.data);
        setDataRender(response.data);
      }
    };

    fetchCategoryBlogs();
  }, []);

  const handleFilter = (keyword) => {
    const result = categories.filter((category) =>
      category.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setDataRender(result);
  };

  const isActiveCategory = (categoryTitle) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("category") === categoryTitle;
  };

  return (
    <div className="p-4">
      <h1 className="border-b border-main text-lg text-main font-bold">
        Danh sách loại blogs
      </h1>
      <div className="my-2 border border-blue-800 rounded py-2 flex pr-3">
        <input
          type="text"
          placeholder="Tìm kiếm loại blog"
          className="outline-none min-w-fit px-2 flex-1"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <button className="border border-main w-fit px-8 bg-blue-700">
          {<ICONS.IoIosSearch size={20} color="white" />}
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-3">
        {dataRender.map((category) => (
          <NavLink
            onClick={() =>
              dispatch(
                setFilterParams({
                  ...filterParams,
                  category: category.title,
                })
              )
            }
            to={{
              pathname: path.BLOGS,
              search: QueryString.stringify({
                ...filterParams,
                category: category.title,
              }),
            }}
            key={category._id}
            className={() =>
              `px-4 py-2 hover:bg-main hover:text-white text-main rounded border border-blue-600 transition-all cursor-pointer flex justify-between ${
                isActiveCategory(category.title) ? "bg-main text-white" : ""
              }`
            }
          >
            <span className="font-bold italic">{category.title}</span>
            <span className="hover:text-blue-300" title="Số lượng blog">
              ({category.totalBlogs})
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default withBaseComponent(Sidebar);
