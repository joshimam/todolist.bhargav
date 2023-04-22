import React, { useState,useEffect } from 'react'
import './style.css'

//get localstorage data back
const getlocadata=()=>{
  
  const lists=localStorage.getItem("mytodolist");
  if(lists)
  {
    return JSON.parse(lists);
  }
  else
  {
    return [];
  }
}

const Todo = () => {
  const [inputdata ,SetInputdata]=useState("");
  const[items,SetItems]=useState(getlocadata());
  //console.log(items);
  const [isediteditems,SetIsediteditem]=useState("");
  const[togglebutton,SetTogglebutton]=useState(false);
  /* add the items */
  const additem =()=>{
  if(!inputdata)
  {
    alert('plz fill the items');
  }
  else if(inputdata && togglebutton){
    
   SetItems(
      (items.map((curElem)=>{
        if(curElem.id===isediteditems)
        {
          
          return {...curElem, name:inputdata}
        }
        return curElem;
        

    }))
    )
    SetInputdata("");
    SetIsediteditem(null);
    SetTogglebutton(false);
  }
  else{
    const mynewinputdata={
      id:new Date().getTime().toString(),
      name:inputdata
    }
    SetItems([...items,mynewinputdata]);
    SetInputdata("");

  }

  }
  // get the edit  items details

  const editItems=(index)=>{
    const todo_edit_item=items.find((curElem)=>{
     return curElem.id===index

    })
    SetInputdata(todo_edit_item.name);
    SetIsediteditem(index);
    SetTogglebutton(true);

  }
  /* add the items */
  //how we delete the data

  const deleteitem=(index)=>{
  const updatedItem=items.filter((curElem)=>{
    return curElem.id!==index;
 });
 SetItems(updatedItem);

  };

  //Remoe All

  const removeAll=()=>{

    SetItems([]);
  }

  //Adding Local storage
  useEffect(()=>{

  localStorage.setItem("mytodolist",JSON.stringify(items))
    
  },[items]);
  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
             <img src="./images/todo.svg" alt="todologo"></img>
             <figcaption>Add Your List Here</figcaption>

            </figure>
            <div  className='additems'>
                <input type="text" placeholder='additem' name="additem" className='form-control' value={inputdata} onChange={(event)=>SetInputdata(event.target.value)}/>
                {togglebutton? (<span onClick={additem}>
                  <i className="far fa-edit add-btn" aria-hidden="false" ></i></span>):(<span onClick={additem}>
                  <i className="fa fa-plus add-btn" aria-hidden="false" ></i></span>)}
                
                
               
            </div>
            {/* show all items   */}
              <div className='showItems'>

                {items.map((curElem)=>(

                <div className="eachItems" key={curElem.id}>
                    <h3>
                      {curElem.name}</h3>
                      <div className='todo-btn'>
                      <i className="far fa-edit add-btn" aria-hidden="true" onClick={()=>editItems(curElem.id)}></i>
                      <i className="far fa-trash-alt delete-btn" aria-hidden="true" onClick={()=>deleteitem(curElem.id)}></i>

                      </div>


                </div>


                ))}
               
              </div>

            {/* remove all items  */}
            <div className='showItems'><button className='btn effect04' data-sm-link-text="REMOVE ALL" onClick={removeAll}><span>CHECK LIST</span></button></div>
        </div>
    </div>
    
    </>
  )
}

export default Todo