import { useState } from 'react'
import './App.css'
import { Card, Row, Col, Divider, Input, Button } from 'antd'
import foods from './foods.json'
import FoodBox from './components/FoodBox'
import { v4 as uuidv4 } from 'uuid';


let foodsId = foods.map(food => {
  food.id=uuidv4()
  return food  
})


function App() {
  const [foodsState, setfoodState] = useState(foodsId)

   const [name, setName] = useState('')
   const [image, setImage] = useState('')
   const [calories, setCalories] = useState(0)
   const [servings, setServings] = useState(0)
   const [search, setSearch] = useState('')
  
   const handleSubmit = event => {
    event.preventDefault()
    
    setfoodState(prevState => {
      return [...prevState, { name, calories, image, servings, id: uuidv4() }]
  })
    setName('')
    setImage('')
    setCalories(0)
    setServings(0)
 }  

   const deleteFood = id => {
    let index = foodsState.findIndex(element => element.id === id)
    let foodStateCopy = [...foodsState]
    foodStateCopy.splice(index, 1)
    setfoodState(foodStateCopy)
  }

  return (
    
      <div className="App">
      {/* Display Add Food component here */
      <form>
      <Divider>Add Food Entry</Divider>

      <label>Name</label>
      <Input type='text' value={name} onChange={event => setName(event.target.value)} />

      <label>Image</label>
      <Input value={image} type="text" onChange={event => setImage(event.target.value)} />

      <label>Calories</label>
      <Input value={calories} type="number" onChange={event => setCalories(event.target.value)} />

      <label>Servings</label>
      <Input value={servings} type="text" onChange={event => setServings(event.target.value)} />

      <button type="submit" onClick={handleSubmit}>Create</button>
    </form>}

      <Button> Hide Form / Add New Food </Button>

      {/* Display Search component here */}
      <label>Search</label>
      <Input type='text' value={search} onChange={event => setSearch(event.target.value)} />
       

      <Divider>Food List</Divider>

      <Row style={{ width: '100%', justifyContent: 'center' }}>
        {/* Render the list of Food Box components here */}
        {foodsState
        .filter(food => {
          if (search === '') return foodsState
          return food.name.toLowerCase().includes(search.toLowerCase())
        })
        .map((food) => {
          
        return <FoodBox deleteFood={deleteFood} food={food} key={food.id}/>
      })}
      </Row>
    </div>

  )
}

export default App
