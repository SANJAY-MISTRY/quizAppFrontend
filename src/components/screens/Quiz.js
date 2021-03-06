import React, { useState, useEffect} from 'react'
import { useLocation, Link, Redirect } from 'react-router-dom'
import { render } from '@testing-library/react';
import NavBar from '../navbar';

const Quiz = () => {
  let data = useLocation() 
  const [allquestions,setAllquestions] = useState([])
  const [currQues,setCurQues] = useState(0)
  const [score,setScore]= useState([])

  
  useEffect (() =>{
    fetch('https://quizaap.herokuapp.com/gameStart',{
      method:"post",
    headers : { 
      "Content-Type":"application/json",
      'Accept': 'application/json'
    },
    body:JSON.stringify({
      topic:data.state._id
  })
  })
  .then(res => res.json())
  .then(result =>{
      setAllquestions(result)
  })
},[]) 

const next_n_score = (x,ques) =>{
  if(score.length == 0){
    setScore(prev => [...prev,{"ques_id":ques._id,"question":ques.question,"opt":x,"ans":ques.answer}])
  }
  else{
    let reset = score.find(ele =>ele.ques_id == ques._id)
    if(reset){
      score.forEach(ele =>{
          if(ele.ques_id == ques._id){
            ele.opt = x
          }
        })
    }else    
    setScore(prev => [...prev,{"ques_id":ques._id,"question":ques.question,"opt":x,"ans":ques.answer}])
  }
 
}
console.log(score)

if(!allquestions.length){
return(<div>
 <img style={{
             position: 'relative',
             height:'100vh',
             width: '100%'
         }}src ="https://i2.wp.com/codemyui.com/wp-content/uploads/2017/09/rotate-pulsating-loading-animation.gif?fit=880%2C440&ssl=1" alt=""/>
</div>)
}
  return( 
    <div>
      <NavBar/> 
    <div style={{
      width:'80%',
      textAlign:'center',
      margin:"20px auto",
      height:'70vh'
    }}>
        <div>
          <div className="mb-3"
                style={{
                  color:'black',
                  padding:'8px',
                  border:'1px solid black',
                  marginLeft:'78%',
                  width:'15%'
                }}>
            <Link 
                to={{ 
                pathname: "/Result" ,
                state: {score,"topic":data.state.name}
               }}>
                 Submit
              </Link>
          </div>
          <div className="mt-3, mx-auto">

            <h5>{currQues+1+'. '+allquestions[currQues].question}</h5>
          </div>
          <div>
            <div  style ={{
            display:'flex',
            justifyContent:'center'
          }}>
                <button style ={{
                  margin:'10px',
                  width:'38%'
                  
                }}
                  onClick={()=>{next_n_score(0,allquestions[currQues])}}
                >
                  <p className="pt-2 font-weight-bold">{allquestions[currQues].options[0]}</p>
                </button>
                <button style ={{
                  margin:'10px',
                  width:'38%'
                }}
                  onClick={()=>{next_n_score(1,allquestions[currQues])}}
                >
                  <p className="pt-2 font-weight-bold">{allquestions[currQues].options[1]}</p>
                </button>
              </div>
              <div>
                <button style ={{
                  margin:'10px',
                  width:'38%'
                }}
                  onClick={()=>{next_n_score(2,allquestions[currQues])}}
                >
                  <p className="pt-2 font-weight-bold">{allquestions[currQues].options[2]}</p>
                </button>
                <button style ={{
                  margin:'10px',
                  width:'38%'
                }}
                  onClick={()=>{next_n_score(3,allquestions[currQues])}}
                >
                  <p className="pt-2 font-weight-bold">{allquestions[currQues].options[3]}</p>
                </button>
                </div>
          </div>
          <div  style ={{
            display:'flex',
            justifyContent:'space-around'
          }}>
          <button className="btn btn-info"
          onClick={() =>{
            if(currQues > 0 ){
              setCurQues(currQues - 1)
            }
          }}>previous</button>
          <button className="btn btn-success"
          onClick ={() =>{
            if(currQues < allquestions.length -1 ){
              setCurQues(currQues+1)
            }
            }}>
              next
            </button>
          </div>
        </div>
        </div>
    </div>  
  )
}

export default Quiz