import React, { useState , useEffect} from 'react'
import { Button, Input } from '../component';
import Select from 'react-select'




function AddPartner (props){
    const { materialList, addPartner } = props
    const [ partnerName , setPartnerName ] = useState("")
    const [ partnerAddress , setPartnerAddress ] = useState("")
    const [ partnerPhoneNo , setPartnerPhoneNo ] = useState("")
    const [ selectedItems , setSelectedItems ] = useState([])
    const [ quantity , setQuantity ] = useState("")
    const [ price , setPrice ] = useState("")

    const buttonAllignment = {
        alignSelf: "flex-end",
    }

    const selectStyle = {
        input: (baseStyles) => ({
          ...baseStyles,
          height:"2.4em",
          padding:"0.2rem"
        }),
        control: (baseStyles) => ({
            ...baseStyles,
            borderRadius:"8em"
        }),
        container: (baseStyles) => ({
            ...baseStyles,
            width:"76%", 
            height: "3em",
            paddingRight:"1rem"
        }),
        valueContainer:(baseStyles) => ({
            ...baseStyles,
            border:"1px solid lightblue",
            borderTopLeftRadius:"8em",
            borderBottomLeftRadius:"8em"
        }),
        indicatorsContainer:(baseStyles) => ({
            ...baseStyles,
            border:"1px solid lightblue",
            borderTopRightRadius:"8em",
            borderBottomRightRadius:"8em"
        }),
      }

    const onChange =(name , event) =>{
        if( name == "partnername"){
            setPartnerName(event.target.value)
        }else if( name == "address"){
            setPartnerAddress(event.target.value)
        }else if( name == "phoneno"){
            setPartnerPhoneNo(event.target.value)
        }else if( name == "quantity"){
            setQuantity(event.target.value)
        }else  if( name == "price"){
            setPrice(event.target.value)
        }
    }

    const handleSelect = data =>{
        setSelectedItems([...data])

    }


    const onCLickAddPartner = () =>{
        const partnerData =  {
            name: partnerName,
            address: partnerAddress,
            phone_no: parseInt(partnerPhoneNo),
            items: selectedItems.map(item =>{
                return {
                    _id: item.value,
                    name: item.label
                }
            }),
            quantity: parseInt(quantity),
            price: parseFloat(price),
            totalPrice: parseFloat(price)*parseInt(quantity)
        }
        addPartner(partnerData)
    }


    const materialListName = materialList.map(material =>  ({
        "value" : material._id,
        "label" : material.name
    }))

    return (
        <div className='addpartnerContainer'>
             <Input
                onChange =  {(e) => onChange('partnername' ,e)}
                type="text" 
                placeholder = "Partner Name" 
                label= "Partner Name" 
                labelStyle= {{fontSize : "18px", margin:"0.5em" }}
                value={partnerName}
                />
            <Input
                onChange =  {(e) => onChange('address' ,e)}
                type="text" 
                placeholder = "address" 
                label= "Address" 
                labelStyle= {{fontSize : "18px", margin:"0.5em" }}
                value={partnerAddress}
                />
            <Input
                onChange =  {(e) => onChange('phoneno' ,e)}
                type="number" 
                placeholder = "Phone No" 
                label= "Phone no" 
                labelStyle= {{fontSize : "18px", margin:"0.5em" }}
                value={partnerPhoneNo}
                />
            <div className='selectContainer'>
                <span className='selectLabel'>Item :</span>
                <Select
                    styles={selectStyle}
                    options ={materialListName}
                    placeholder="Select your item"
                    isMulti
                    onChange = {handleSelect}
                    value={selectedItems}
                    /> 
            </div>    
            
            <Input
                onChange =  {(e) => onChange('quantity' ,e)}
                type="number" 
                placeholder = "Quantity" 
                label= "Quantity" 
                labelStyle= {{fontSize : "18px", margin:"0.5em" }}
                value={quantity}
                />
            <Input
                onChange =  {(e) => onChange('price' ,e)}
                type="number" 
                placeholder = "Price" 
                label= "Price" 
                labelStyle= {{fontSize : "18px", margin:"0.5em" }}
                value={price}
                />

            <Button 
                name ="Add Partner"
                style ={buttonAllignment}
                onClick={onCLickAddPartner}/>
        </div>
    )
}


export default AddPartner;