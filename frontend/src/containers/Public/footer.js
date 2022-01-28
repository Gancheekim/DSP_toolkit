import './footer.css'
import { Button } from '@mui/material';

export default function Footer() {

    return (
        <div className="main-footer">
            <div className="container">
                <div className="column1">
                    <ul className="list-item left-ul">
                        <li>About us:</li>
                        <li>This is an online platform that provides free toolkit for some 
                            state-of-the-art digital signal processing algorithm.
                        </li>
                    </ul>
                </div>
                <div className="column2">
                    <ul className="list-item">
                        <li>Contact us:</li>
                        <li>
                            Professor in charge: Jian-Jun Ding (jjding@ntu.edu.tw)
                            <Button className="redirect-button" color="primary"onClick={event =>  window.location.href='http://www.ee.ntu.edu.tw/profile1.php?id=742'}>
                                Personal Page
                            </Button>
                        </li>
                        <li>Lab student: Gan Chee Kim (b07901133@ntu.edu.tw)</li>
                        <li>Active maintainer, email</li>
                    </ul>
                </div>
                <div className="copyright">
                    <p>Copyright &copy; </p>
                </div>
            </div>
        </div>
    );
}