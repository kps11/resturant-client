import React, { useEffect ,useState } from 'react';
import { Profile , Employee , Menu } from "./";
import Modal from '../component/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees ,fetchEmployeeDetails , updateEmployeeDetails} from '../action/employeeAction';
import { fetchMenu , addMenuItem , updateItem, deleteItem } from '../action/menuAction';
import "../style/body.css"

function Dashboard(props) {
  const empData = useSelector(state => state.employee.employeeDetails)
  const  menuLoader  =  useSelector(state => state.menu.menuLoader)
  const   itemList  =  useSelector(state => state.menu.menuList)
  const [ item , setItem] = useState("")
  const [ openModal , setOpenModal] = useState(false);
  const [ updateItemList ,  setUpdateItemList ] = useState(false)
  const [ role , setRole] = useState()
  const dispatch = useDispatch();

   const [ employeeDetails , setEmployeeDetails] = useState(empData)

  const onClickItem = (value) =>{
    setItem(value)
  }

    useEffect(() =>{
        if( item == "Employee" )  {
            dispatch(fetchEmployees())
        }else if( item == "Menu") {
            dispatch(fetchMenu())
        }
    },[item])

    useEffect( () =>{
        setEmployeeDetails(empData)
    },[empData])

    //menu item
    useEffect( () =>{
        setUpdateItemList(!updateItemList)
        fetchMenu()
    },[itemList])

    const onsubmitMenuItem =( data , id ="") =>{

        if( id .length >0){
            dispatch(updateItem(data, id))
        }else{
            dispatch(addMenuItem(data))
        }

    }


    const onClickEdit = (email) =>{
        dispatch(fetchEmployeeDetails(email))
        setOpenModal(true)
    }

    const onChange = (e, field) =>{
        
        setEmployeeDetails({
            ...employeeDetails,
            [field] : e.target.value
        })

    }
    const onClickClose = () =>{
        setOpenModal(false)
    }

    const onClickUpdate = () =>{
        dispatch( updateEmployeeDetails(employeeDetails))
        setOpenModal(false)
    }



    return (
        <div className='dashboardContainer'>
            <div className='navContainer'>
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80" 
                        className='grvatar'/>
                    <span className={ item == "Profile" ? "itemContainer selected":"itemContainer"} onClick={()=>onClickItem('Profile')}>Profile</span>
                    <span className={ item == "Dashboard" ? "itemContainer selected":"itemContainer"} onClick={()=>onClickItem('Dashboard')}>Dashboard</span>
                    <span className={ item == "Menu" ? "itemContainer selected":"itemContainer"} onClick={()=>onClickItem('Menu')}>Menu</span>
                    <span className={ item == "Order" ? "itemContainer selected":"itemContainer"} onClick={()=>onClickItem('Order')}>Order</span>
                    <span className={ item == "Employee" ? "itemContainer selected":"itemContainer"} onClick={()=>onClickItem('Employee')}>Employee</span>
                    <span className={ item == "Material" ? "itemContainer selected":"itemContainer"} onClick={()=>onClickItem('Material')}>Material</span>
                    <span className={ item == "Revenue" ? "itemContainer selected":"itemContainer"} onClick={()=>onClickItem('Revenue')}>Revenue</span>
                    <span className={ item == "Customer Review" ? "itemContainer selected":"itemContainer"} onClick={()=>onClickItem('Customer Review')}>Customer Review</span>
                    <span className={ item == "Settings" ? "itemContainer selected":"itemContainer"} onClick={()=>onClickItem('Settings')}>Settings</span>
            </div>
            <div className='displayContainer'>
                { 
                    item == 'Profile' ? 
                        <Profile/>:
                    item == "Employee" ?
                        <Employee openModal={openModal} onClickEdit={onClickEdit}  onClickClose={onClickClose}/>:
                    item == "Menu" ?
                        <Menu itemList={itemList} onsubmitMenuItem={onsubmitMenuItem} updateItemList={updateItemList} menuLoader={menuLoader}/> :    
                        <></>    
                    
                }
                
            </div>
            { openModal && <div className='displayConatiner modalContainer'>
                    <Modal onClickUpdate={onClickUpdate} onChange={onChange} data={employeeDetails} onClickClose={onClickClose}/>
                    </div>}
        </div>
    );
}

export default Dashboard;