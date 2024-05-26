import React from 'react';
import classNames from "classnames";

enum BadgeType {
    Pass = "Pass",
    Failed = "Failed",
    Over = "Over",
    Cancel = "Cancel"

}
const Badge:React.FC<{type:BadgeType}> = ({type})=>{
    return (
        <div className={classNames("badge ",
            {"badge-primary":type === BadgeType.Pass},
            {"badge-error":type === BadgeType.Failed},
            {"badge-warning":type === BadgeType.Over},
            {"badge-secondary":type === BadgeType.Cancel},
        )}>{type}</div>
    )
}
const ExamAttempts: React.FC = () => {
    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="text-lg">Exam</th>
                        <th className="text-lg">Qus</th>
                        <th className="text-lg">Grade</th>
                        <th className="text-lg">Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {[BadgeType.Cancel, BadgeType.Failed, BadgeType.Over, BadgeType.Pass, BadgeType.Pass].map((exam, index) => (
                        <tr>
                            <th>
                                <p className=" text-base-content/40">May 26, 2024</p>
                                <span className="text-lg text-base-content/95">Database SQL {index+1}</span>
                                <p className="text-base-content/80">Instructor : <span
                                    className="text-base-content">Hazem</span></p>
                            </th>
                            <td>{4+index*2}</td>
                            <td>{index * 15}/80</td>
                            <td>
                                <Badge type={
                                    exam
                                }/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExamAttempts;
