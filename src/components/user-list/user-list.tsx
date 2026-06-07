import { useState } from "react";
import { useDeleteUser } from "../../api-methods/delete-user";
import { useGetUsers, UsersQueryKey } from "../../api-methods/get-user";
import type { UserModel } from "../../lib/types";
import { UserRow } from "./userrow";
import { useQueryClient } from "@tanstack/react-query";


  interface UserListProps{
    editedUser: UserModel | null;
    onEditClick: (u: UserModel)=> void;
  }

export const UserList = ({editedUser, onEditClick} : UserListProps) => {

  const queryClient = useQueryClient();

  const [deletingUserIds, setDeletingId] = useState<number[]>([]);

  const {
    data: users,
    isLoading: isUsersLoading,
    isRefetching: isUsersRefetching,
  } = useGetUsers();

    const { mutate: deleteUser, isPending: isUserDeleting } = useDeleteUser();
  
    const handnleDelete = (id: number) => { 

      const ids = [...deletingUserIds, id];
      setDeletingId(ids)

      deleteUser(id, { onSuccess: () => onDeleteSuccess(id) });
    };
  





    const onDeleteSuccess = (id: number) => {

      const newIds = deletingUserIds.filter(i => i !==id);
      setDeletingId(newIds);

      queryClient.setQueryData<UserModel[]>(UsersQueryKey, (cached) =>{
        if (!cached){
          return cached;
        }

        return cached.filter(u => u.id !== id);
      })

    };
  





    
    const isListLoading = isUsersLoading || isUsersRefetching;
    

    return (
         <div className="d-flex flex-column gap-2 p-2 w-50">

        {!isListLoading && users?.length === 0 && (<span className ="align-self-center">Нет пользователей</span>)}

        {isListLoading &&
         (<div className ="align-self-center spinner-grow text-primary"></div>)}
        {!isListLoading &&
          users?.map((u, i) => (
            <UserRow
              key={u.id}
              user={u}
              onDeleteClick={handnleDelete}
              onEditClick={onEditClick}
              isUserDeleting={deletingUserIds.some(id => id === u.id)}
              isUserOtherDeleting ={isUserDeleting}
              isUserSelected={editedUser?.id == u.id}
              line={i+1}
              
            />
          ))}

      </div>
    )

}