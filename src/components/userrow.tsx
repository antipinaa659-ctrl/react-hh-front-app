import type { UserModel } from "../lib/types";

const PATH = "/resume-pdf/";


interface UserRowProps {
  line: number;
  user: UserModel;
  onDeleteClick:(id: number)=> void;
  onEditClick:(user: UserModel)=> void;
  isUserDeleting: boolean;
  isUserSelected: boolean;
}

export const UserRow = ({ line, user, onDeleteClick, onEditClick, isUserDeleting, isUserSelected}: UserRowProps) => {
  return (
    <div style={{backgroundColor: isUserSelected ? "rgb(188, 188, 188)" : "rgb(222, 222, 222)"}} className="d-flex flex-row gap-2 shadow p-2 rounded-3 ps-4 justify-content-between">
      
      <div className="d-flex flex-row gap-2 w-100  ">
       
        <span style={{ width: "30px" }}>{line}</span>
       
       <span className= "fw-bold" style={{ width: "250px" }}>{ user.lastName + " " + user.firstName + " " + user.patronymic}</span>

        <span style={{ width: "50px" }} className="">
          {user.age}
        </span>

       <span  style={{ width: "250px" }}>
          {user.phoneNumber}
        </span>

        {user.isCitizen ? (
        <span className="text-success text-nowrap">Гражданин РФ</span>) :
        (<span className="text-primary text-nowrap">Иностранец</span>)}

         

         

      </div>

      {!isUserDeleting&& (
      <div  
      onClick={()=> {window.open(PATH + user.resume,"_blank")

      }} 
      style={{cursor: "pointer"}}>
        📝
        </div>
      )}

      {!isUserDeleting&& (
      <div
       onClick={()=> onEditClick(user)} 
      style={{cursor: "pointer"}}>
        ✏️
        </div>
      )}

      
      


      {!isUserDeleting && ( //или добавить isUserSelected && тогда просто удалится кнопка крестика когда будет нажат карандаш

      <button
      disabled={isUserSelected}
       onClick={()=>onDeleteClick (user.id)} 
       className="btn btn-close">
       </button>
      )}

    </div>
  );
}; 
