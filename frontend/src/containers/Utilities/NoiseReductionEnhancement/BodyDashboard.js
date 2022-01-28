import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function Dashboard() {
  return (
    <div style={{backgroundColor:"white", width: "75%", margin:"auto", position:"relative", top: "30px", padding:"20px" }}>
      <MathJaxContext>
      <div style={{lineHeight:"32px"}}>
        <span>introduction<br/>
        Advantages: <br/>
        Disadvantages: <br/>
        </span>
        <br/>
        <MathJax hideUntilTypeset={"first"} >
          <span style={{fontWeight:"bold"}}>Standard Definition: </span>
          <span style={{border:"dashed blue", padding: "8px"}}>
          {`\\( a+b=c \\)`}
          </span>
        </MathJax>
        <span>
          {"more intro"}
        </span>
        <br/>
        <MathJax hideUntilTypeset={"first"} >
        <span>intro </span>
          <span style={{border:"dashed blue", padding: "8px"}}>
          {`\\( \\alpha = \\beta \\)`}
        </span>
        </MathJax>
        <MathJax>
        <br/>
        <span style={{fontWeight:"bold"}}>Digital Implementation:</span><br/>
        <span>Some Method</span><br/>
        <div style={{fontSize:"18px", padding:"15px",  border:"dashed blue", width: "40%"}}>
          {`\\( equation \\)`}
        </div>

        <div style={{backgroundColor:"lightgray", lineHeight:"24px", width: "80%", padding:"12px", fontFamily:"Comic Sans MS, Comic Sans, cursive"}}>
        {`\\( \\hspace{1em}\\)`}{`some pseudocode here`}<br/>
        {`\\( \\hspace{2em}\\)`}{`add tab at the start of new line`}<br/>
        </div>
          
        </MathJax>
      </div>

      </MathJaxContext>
    </div>
  )
}