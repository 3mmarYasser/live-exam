import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import { useGetExamsQuery} from "../../../graphql/generated/graphql.tsx";

const AvailableExams = () => {
    const {data , loading } = useGetExamsQuery();
    useEffect(()=>{
        console.log(data)
    },[data])
    return (
        <div >
            <h3 className="text-xl font-[400]">Available Exams</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4">
                {data && !loading && data.get_exams.map((exam, index) => (<>

                        <div className="card w-full  bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10 ">
                                <img src="https://img.icons8.com/?size=100&id=XPJGXbT6hVjd&format=png"
                                     alt="Shoes"
                                     className="rounded-xl"/>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{exam.title}</h2>
                                <p>If a dog chews shoes whose shoes does he choose?</p>
                                <div className="card-actions">
                                    <Link to={`/exam/${exam.id}`} className="btn btn-primary">Start Now</Link>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default AvailableExams;
