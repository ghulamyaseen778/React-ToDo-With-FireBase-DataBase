import { useEffect, useState } from 'react';
import './App.css';
import { db } from "./firebase"
import { collection, addDoc, getDocs, doc, deleteDoc,updateDoc } from "firebase/firestore";

function App() {
  const [inputval, setinputval] = useState("")
  const [item, setitem] = useState([])
  const [updatetodo, setupdatetodo] = useState("")
  const [num, setnum] = useState("")
  const [updatearr, setupdatearr] = useState(false)
  // console.log(db)
  const dbconn = collection(db, "tododata")

  useEffect(
    () => {
      async function dataGetting() {
        const arr = []
        const querySnapshot = await getDocs(dbconn);
        querySnapshot.forEach((doc) => {
          arr.push({
            id: doc.id,
            val: doc.data().todoval
          })
        });
        setitem([...arr])
      }
      dataGetting()
    }, [updatearr]
  )

  const add = async () => {
    if (!inputval) {

    } else {
      await addDoc(dbconn, {
        todoval: inputval
      })
      // setitem([inputval,...item])
      setinputval('')
      setupdatearr(!updatearr)
      // setupdatetodo(inputval)
    }
  }
  const del = async (id) => {
    
    const idn = item[id].id
    const delRef =doc(dbconn,idn)
    await deleteDoc(delRef)
    item.splice(id, 1)
    setitem([...item])
  }
  const edit = (id) => {
    setnum(id)
    // setitem([...item])
    // console.log(item)
  }
  const update = async (id) => {
    const idc = item[id].id
    const dbRef =doc(dbconn,idc)
    item.splice(id, 1, {val:updatetodo,id:idc})
    await updateDoc(dbRef,{
      todoval:item[id].val
    })
    setitem([...item])
    setnum('')

  }
  const delall = () => {
    setitem([])
  }
  return (
    <>
      <div className="main-div">
        <div className="content-div">
          <div className="top">
            <input type="text" value={inputval} onChange={(e) => { setinputval(e.target.value) }} autoFocus={true} className="data-input" />
            <div className="btns">
              <button onClick={add} className="add-btn">add</button>
              <button onClick={delall} className="del-all-btn">delete all</button>
            </div>
          </div>
          <div className="display">
            {
              item.map((e, i) => {
                return (
                  num === i ? (<div key={i} className="update-div">
                    <div className="u-f-div">
                      <input type="text" className="update-input" value={updatetodo}  onChange={(e) => { setupdatetodo(e.target.value) }} autoFocus={true} />
                    </div>
                    <div className="u-s-div">
                      <button onClick={() => update(i)} className="update-btn">update</button>
                    </div>
                  </div>) : (<div key={i} className="item-area">
                    <div className="f-div">
                      <p>{e.val}</p>
                    </div>
                    <div className="s-div">
                      <button onClick={() => del(i)} className="del-btn">delete</button>
                    </div>
                    <div className="t-div">
                      <button onClick={() => edit(i)} className="edit-btn">edit</button>
                    </div>
                  </div>)
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
