import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";

const Main = () => {
  interface Todo {
    id: string;
  }
  const [ todos, setTodos ] = useState<Todo[] | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
        const q = query(collection(db, "todo"));
        console.log(q)
        const querySnapshot = await getDocs(q);
        const initialTodos: Todo[] = [];
  
        // document의 id와 데이터를 initialTodos에 저장합니다.
        // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
        // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다. 
        querySnapshot.forEach((doc) => {
          initialTodos.push({ id: doc.id, ...doc.data() }as Todo);
        });
  
        // firestore에서 가져온 데이터를 state에 전달
        setTodos(initialTodos);
        console.log('Initial Todos:', initialTodos);
    };
    fetchData();
  }, []);

  
  return (
    <>
      <Button> MainPage </Button>
    </>
  );
};

export default Main;
