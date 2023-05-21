import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ThemeContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
const Updatecourse = () => {
    const {id} = useParams();
    const navgate = useNavigate();
    const [courseData, setCourseData] = useState({
        tittle: "",
        price: 0,
        img: "",
        description: "",
        duration: "",
        catagory: "",
        instructor_name: "",
        instructor_profession: "",
        instructor_qual: "",
        instructor_img: "",
      });
      const {
        tittle,
        price,
        img,
        description,
        duration,
        catagory,
        instructor_img,
        instructor_name,
        instructor_profession,
        instructor_qual,
      } = courseData;
      const { user } = useContext(ThemeContext);
      useEffect(()=>{
        axios.get(`https://learner-elearning-server.onrender.com/api/users/course/${id}`).then((res)=>{
            if(res.data && res.data._id){
                setCourseData(res.data);
                
            }
        })
      },[])
      const handleSubmit = () => {
        if( (!tittle ||
            !price ||
            !img ||
            !description ||
            !duration ||
            !catagory ||
            !instructor_img ||
            !instructor_name ||
            !instructor_profession ||
            !instructor_qual) || price<1000 ){
                toast.error("Please enter valid data!");
                return;
            }
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        toast.promise(
        axios
          .post("https://learner-elearning-server.onrender.com/api/users/updatecourse", courseData, config)
          .then((res) => {
            if (res.data && res.data?._id) {
              toast.success("Course is upadted");
            } else {
              toast.error("Server error please try again");
            }
          }),{
            pending:"Please wait"
          });
      };
      const onCourseDataChange = (e) => {
        setCourseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      return (
        <div className="w-2/4 mx-auto shadow-lg p-5">
          <h1 className="text-3xl text-center font-semibold py-10">Update Course</h1>
          <div className="flex flex-col space-y-5">
            <div>
              <span className="text-xl  font-semibold">Tittle:</span>
              <input
                type="text"
                onChange={onCourseDataChange}
                className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                placeholder="Enter the course tittle"
                value={tittle}
                name="tittle"
              />
            </div>
            <div>
              <span className="text-xl  font-semibold">Price:</span>
              <input
                onChange={onCourseDataChange}
                type="number"
                min="999"
                className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                placeholder="Enter the course amount"
                value={price}
                name="price"
              />
            </div>
            <div>
              <span className="text-xl  font-semibold">Image:</span>
              <input
                onChange={onCourseDataChange}
                type="text"
                className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                placeholder="Enter the course amount"
                value={img}
                name="img"
              />
            </div>
            <div>
              <span className="text-xl  font-semibold">Description:</span>
              <textarea
                onChange={onCourseDataChange}
                type="text"
                className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                placeholder="Enter the course amount"
                value={description}
                name="description"
              />
            </div>
            <div>
              <span className="text-xl  font-semibold">Duration:</span>
              <input
                onChange={onCourseDataChange}
                type="text"
                className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                placeholder="Enter the course amount"
                value={duration}
                name="duration"
              />
            </div>
            <div>
              <span className="text-xl  font-semibold">Catagory:</span>
              <select
                onChange={onCourseDataChange}
                type="text"
                className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                placeholder="Enter the course amount"
                value={catagory}
                name="catagory"
              >
                <option  value="development">Development</option>
                <option defaultChecked value="design">Design</option>
                <option value="programming">Programming</option>
                <option value="it_software">It & Software</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-10 ">
              <div>
                <div>
                  <span className="text-xl  font-semibold">Instructor Name</span>
                  <input
                    onChange={onCourseDataChange}
                    type="text"
                    className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                    placeholder="Enter the course amount"
                    value={instructor_name}
                    name="instructor_name"
                  />
                </div>
              </div>
              <div>
                <div>
                  <span className="text-xl  font-semibold">
                    Instructor Profession
                  </span>
                  <input
                    onChange={onCourseDataChange}
                    type="text"
                    className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                    placeholder="Enter the course amount"
                    value={instructor_profession}
                    name="instructor_profession"
                  />
                </div>
              </div>
              <div>
                <div>
                  <span className="text-xl  font-semibold">
                    Instructor Qualification
                  </span>
                  <input
                    onChange={onCourseDataChange}
                    type="text"
                    className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                    placeholder="Enter the course amount"
                    value={instructor_qual}
                    name="instructor_qual"
                  />
                </div>
              </div>
              <div>
                <div>
                  <span className="text-xl  font-semibold">Instructor Image</span>
                  <input
                    onChange={onCourseDataChange}
                    type="text"
                    className="p-4 bg-[#dfdfdf94] shadow-sm rounded w-full my-4"
                    placeholder="Enter the course amount"
                    value={instructor_img}
                    name="instructor_img"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="px-5 py-2 bg-five text-[white] rounded my-2 hover:bg-[green]"
              onClick={() => handleSubmit()}
            >
              Update
            </button>
          </div>
        </div>
      );
};

export default Updatecourse;