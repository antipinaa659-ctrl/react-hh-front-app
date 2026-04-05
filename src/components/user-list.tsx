import { useDeleteUser } from "../api-methods/delete-user";
import { useGetUsers } from "../api-methods/get-user";
import type { UserModel } from "../lib/types";
import { UserRow } from "./userrow";


  interface UserListProps{
    editedUser: UserModel | null;
    onEditClick: (u: UserModel)=> void;
  }

export const UserList = ({editedUser, onEditClick} : UserListProps) => {

  const {
    data: users,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
    isRefetching: isUsersRefetching,
  } = useGetUsers();

    const { mutate: deleteUser, isPending: isUserDeleting } = useDeleteUser();
  
    const handnleDelete = (id: number) => {
      deleteUser(id, { onSuccess: onDeleteSuccess });
    };
  
    const onDeleteSuccess = () => {
      refetchUsers();
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
              isUserDeleting={isUserDeleting}
              isUserSelected={editedUser?.id == u.id}
              line={i+1}
              
            />
          ))}

      </div>
    )

}