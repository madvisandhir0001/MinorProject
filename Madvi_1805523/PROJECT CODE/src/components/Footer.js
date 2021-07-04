import React from 'react'
import styled from 'styled-components';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import SocialLink from './SocialLink';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router';

const Footer = () => {
    const history = useHistory();
    return (
        <Container>
            <Card>
                <Left>

                    <Brand>
                        <img style={{ filter: "invert(1)" }}
                            src="https://firebasestorage.googleapis.com/v0/b/waytosuccess-india.appspot.com/o/assests%2Flogo.png?alt=media&token=2c88bef2-01a6-4d91-8cc0-fbe6f16e52f6" alt="app__logo" />
                        <h1>Way to Success</h1>
                    </Brand>
                    <p>We provide you the platform to advertise your products and connect you with the other buyers and sellers.</p>

                    <div>
                        <Links>
                            <h3>Links</h3>
                            <div>
                                <h4 onClick={() => history.push('/about')}>About Us</h4>
                                <h4 onClick={() => history.push('/contact')}>Contact Us</h4>
                                <h4 onClick={() => history.push('/user/register')}>Advertise with us</h4>
                                <h4 onClick={() => history.push('/categories/Steel%20&%20Iron%20Industries')}>Categories</h4>
                                <a href="#brief-profile">Newsfeed</a>
                            </div>
                        </Links>
                    </div>
                </Left>
                {/* <Right>
                    <SocialLink name={'mail@gmail.com'} icon={<MailIcon className="mui-icon-40" />} link={"https://www.google.com/"} />
                    <SocialLink name={'985751XXXX'} icon={<PhoneIcon className="mui-icon-40" />} link={"https://www.google.com/"} />
                    <div>
                        <SocialLink icon={<FacebookIcon className="mui-icon-40" />} link={"https://www.google.com/"} />
                        <SocialLink icon={<InstagramIcon className="mui-icon-40" />} link={"https://www.google.com/"} />
                        <SocialLink icon={<YouTubeIcon className="mui-icon-40" />} link={"https://www.google.com/"} />
                        <SocialLink icon={<TwitterIcon className="mui-icon-40" />} link={"https://www.google.com/"} />
                    </div>
                </Right> */}
            </Card>
        </Container>
    )
}

export default Footer

const Container = styled.div`
    min-height:500px;
    background-color:#000;
    margin-top: 100px;
    color:#fff;
`;
const Card = styled.div`
    display: flex;
    width:60vw;
    margin: auto;
    padding: 40px 0;
    align-items: center;
    ${() => window.innerWidth < 960 && `
        flex-direction:column;
        width:98vw;
        padding: 0 10px;
        margin:auto;
        margin-bottom:60px;
    `}
`;
const Brand = styled.div`
    /* display: flex; */
    /* align-items: center; */
    cursor:pointer;
    >img{
        height:40px;
        object-fit:contain;
    }
    >h1{
        font-size:25px;
        margin-left:20px;
    }
`;
const Left = styled.div`
    flex:.7;
    height:100%;
    >div{
        display: flex;
        padding: 10px;
        align-items: center;
        /* justify-content: center; */
    }
`;

const Right = styled.div`
    flex:.3;
    height:100%;
    display: flex;
    flex-direction:column;
    >div{
        display: flex;
    }
    ${() => window.innerWidth < 960 && `
        flex-direction:row;
        flex-wrap: wrap;
    `}
`;

const Links = styled.div`
    display: flex;
    flex-direction:column;
    /* align-items: center;   */
    justify-content: center;
    flex:0.5;
    >h3{
        align-self: flex-start;
    }
    >div{}
    >div>h4{
        align-self: flex-start;
        font-weight: 300;
        cursor: pointer;
        font-size:20px;
        :hover{
            opacity: 0.8;
        }
    }
    >div>a{
        font-weight: 300;
        font-size:20px;
        color:white;
        :hover{
            opacity: 0.8;
        }
    }
    ${() => window.innerWidth < 960 && `  
        align-items: center;
    `}
`;

const Services = styled.div`
    display: flex;
    flex-direction:column;
    flex:0.5;
    >h3{}
    >div{}
    >div>h4{
        font-weight: 300;
        font-size:20px;
        :hover{
            opacity: 0.8;
        }
    }
    ${() => window.innerWidth < 960 && `  
        align-items: center;
    `}
`;