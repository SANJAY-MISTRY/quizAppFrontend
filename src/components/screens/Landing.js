import React from 'react'
import NavBar from '../navbar'
import { Link } from 'react-router-dom'

const Landing = (props) => {
  return(
    <section className='landing'>
        <NavBar/>
        <div style ={{
          width:'80%',
          textAlign:"center",
          backgroundColor: '#00000040',
          margin:'80px auto',
        }}
        className="py-4">
          <h1 style={{
              color:"#1b6ca8",
              fontFamily:"'Piedra', cursive"
          }}>
            Quiz App</h1>
            <div>
              <h5>WELLCOME TO QUIZ APP</h5>
            </div>
            <div>
              <p>
                <ul>
                  <li>This quiz is some Technical knowledge questions. </li>
                  <li>The questions are hand-selected and are designed to test a wide range of your general knowledge. </li>
                  <li>You can track your progress with score secure in each game at dashboard.</li>
                  
                </ul>
              </p>
            </div>
            <div>
              <button className ='waves-effect waves-light btn-large mx-2'><Link className='link' to="/login">Login</Link></button>
              <button className ='waves-effect waves-light btn-large mx-2'><Link className='link' to="/Signup">SignUp</Link></button>
            </div>
        </div>
    </section>
   )

 }

export default Landing