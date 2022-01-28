import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function Dashboard() {
  return (
    <div style={{backgroundColor:"white", width: "75%", margin:"auto", position:"relative", top: "30px", padding:"20px" }}>
      <MathJaxContext>
      <div style={{lineHeight:"32px"}}>
        <span>Gabor transform is a special case of STFT (Short Time Fourier Transform), by choosing Gaussian function as the mask.<br/>
        Advantages: <br/>
          (1) minimal time-frequency distribution (least sampling points) <br/> 
          (2) Has correspond characteristic on time domain and frequency domain (because Gaussian function is FT's eigenfunction) <br/>
        </span>
        <br/>
        <MathJax hideUntilTypeset={"first"} >
          <span style={{fontWeight:"bold"}}>Standard Definition: </span>
          <span style={{border:"dashed blue", padding: "8px"}}>
          {`\\(G_x(t,f) = \\int_{-\\infty}^{\\infty} e^{-\\pi (t-\\tau)^2} e^{-j2\\pi f \\tau} x(\\tau) d\\tau \\)`}
          </span>
        </MathJax>
        <span>
          {"Athough the range of integration is from (\\(-\\infty,\\infty\\)), due to the fact that"}
          <span>{` \\(e^{-\\pi a^2} < 0.00001\\) when |a| > 1.9143`}</span> 
        </span>
        <br/>
        <span>the Gabor transform can be simplified as: </span>
        <span style={{border:"dashed blue", padding: "8px"}}>
        {`\\(\\hspace{1em} G_x(t,f) \\approx \\int_{t-1.9143}^{t+1.9143} e^{-\\pi (t-\\tau)^2} e^{-j2\\pi f \\tau} x(\\tau) d\\tau \\)`}  
        </span>
        <MathJax>
        <br/>
        <span style={{fontWeight:"bold"}}>Digital Implementation:</span><br/>
        <span>FFT-Based Method</span><br/>
        <div style={{fontSize:"18px", padding:"15px",  border:"dashed blue", width: "40%"}}>
          {`\\( X(n\\Delta_t, m\\Delta_f) = \\Delta_t \\hspace{5px} e^{j\\frac{2\\pi (Q-n)m}{N}} \\sum_{q=0}^{N-1} x1(q) \\cdot e^{-j\\frac{2\\pi qm}{N}}\\)`}
        </div>

        <div style={{backgroundColor:"lightgray", lineHeight:"24px", width: "80%", padding:"12px", fontFamily:"Comic Sans MS, Comic Sans, cursive"}}>
        {`calculate \\(\\Delta_t, \\Delta_f, N \\) `}<br/>
        {`initiate a 2D array W = 0  `}<br/>
        {`for n = n1:n2  `}<br/>
        {`\\( \\hspace{1em}\\)`}{`let Q = min(n_2-n,n-n_1) `}<br/>
        {`\\( \\hspace{1em}\\)`}{`initiate a 1D array w = 0 of size (N) `}<br/>
        {`\\( \\hspace{1em}\\)`}{`for q = 1:2Q+1 `}<br/>
        {`\\( \\hspace{2em}\\)`}{`let boundary1 = round((n+q-Q)-n1) `}<br/>
        {`\\( \\hspace{2em}\\)`}{`let boundary2 = round((n-q-Q)-n1) `}<br/>
        {`\\( \\hspace{2em}\\)`}{`if  0 < boundary1,boundary2 < T   // T is the length of input signal x(t) `}<br/>
        {`\\( \\hspace{3em}\\)`}{`w(q) = x(boundary1)* \\(x^*\\) (boundary2) `}<br/>
        {`\\( \\hspace{2em}\\)`}{`end if `}<br/>
        {`\\( \\hspace{1em}\\)`}{`end for `}<br/>
        {`\\( \\hspace{1em}\\)`}{`let W1 = FFT(w)   // FFT is the Fast Fourier Transform `}<br/>
        {`\\( \\hspace{1em}\\)`}{`for m = f_1:f_2 `}<br/>
        {`\\( \\hspace{2em}\\)`}{`\\(W(m-f_1+1,n-n_1+1)=W1(mod(m,N))*2 \\Delta_t * e^{j2\\pi mQ/N} \\)  // mod(a,b) is the modulo operation `}<br/>
        {`\\( \\hspace{1em}\\)`}{`end for `}<br/>
        {`end for `}<br/>
        </div>
          
        </MathJax>
      </div>

      </MathJaxContext>
    </div>
  )
}