import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserList } from "./user-list";
import { CreateUserForm } from "./create-user-form";
import { useState } from "react";
import type { UserModel } from "./types";

const App = () => {

  const [editedUser, setEditedUser] = useState<UserModel | null >(null)

  return (
    <div className=" d-flex flex-column gap-3 align-items-center p-3">
     <CreateUserForm editedUser = {editedUser} onClick ={() => setEditedUser (null) }  />
     <UserList onEditClick={setEditedUser} editedUser={editedUser}/>
    </div>
  );
};

export default App;

// Shift + Alt + F  выравнивание кода
// danger - красный
// warning - желтый
// success - зеленый
// primary - синий
// dark - темный
// secondary - серый

//bg - фон
//text - текст
//btn- кнопка

// 1-5 (от маленькго до большого)

// h (заголовок)
// fs (размер шрифта),
// fw (жирность шрифта)
// 1 - самый значимый
// 6 - самый мелкий

// d-flex flex-row - гибкий элемент в строку
// d-flex flex-column - в колокну

// w - ширна (width) 25, 50, 75, 100

// justify-content - расположение по горизонтали
// align-items - расположение элементов по вертикали

// start - начало (все слева)
// center - (по центру)
// end - конец (все справа)
// between - по всей строке равномерно (между концом и началом)

// gap (1-5) промежуток между элементами

// m (margin) - Отступы снаружи элемента (1-5)
// p (padding) - Отступы внутри элемента (1-5)

// t (top - вверх)
// b - (bottom - низ)
// s - (start - левая сторона)
// e - (end - правя сторона)

//в CMD ввести nap run dev что бв запустить
