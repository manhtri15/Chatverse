import React from 'react';
import {Row, Col, Typography} from 'antd';
import firebase, {auth, db} from '../../firebase/config';
import {addDocument, generateKeywords} from '../../firebase/services';
import {Button} from "../Button";

const LaucherIcon = require('../../assets/ic_laucher.png');
const {Title} = Typography;

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login(){
	const handleLogin = async (provider) => {
		const {additionalUserInfo, user} = await auth.signInWithPopup(provider);
		let users = await db
			.collection('users')
			.where('email', '==', additionalUserInfo?.profile.email)
			.limit(1)
			.get();
		console.log(users.docs.length);
		if (users.docs.length === 0) {
			addDocument('users', {
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				uid: user.uid,
				providerId: additionalUserInfo.providerId,
				keywords: generateKeywords(user.displayName?.toLowerCase()),
			});
		}
	};
	
	return (
		<div style={{
			backgroundImage: 'url(https://wallpaperaccess.com/full/17520.jpg)',
			backgroundRepeat: 'no-repeat',
			backgroundSize: "cover",
			height: '100vh',
			display: "flex",
			justifyContent: "center",
			alignItems: 'center'
		}}>
			
			
			<div style={{
				width: 800,
				height: 500,
				padding: 64, display: "flex", justifyContent: "center", alignItems: 'center',
				backgroundColor: '#F2EEE5',
				borderRadius: 8,
				flexDirection: 'column'
			}}>
				<img style={{marginLeft: 16, marginRight: 16, marginBottom: 32}} src={LaucherIcon} width='200'
				     height='200'/>
				
				<Title style={{textAlign: 'center', color: '#BE7575'}} level={6}>Don't play with fire, play with
					Chatverse!</Title>
				
				<div style={{marginTop: 60, flexDirection: 'row', justifyContent: 'space-between'}}>
					<Button
						// style={{marginLeft: 16,width: 150,
						// 	height: 40,}}
						buttonStyle="btn--primary--solid"
						buttonSize="btn--medium"
						onClick={() => handleLogin(googleProvider)}
					>
						Đăng nhập bằng Google
					</Button>
					<Button
						// style={{marginLeft: 16,width: 150,
						// 	height: 40,}}
						buttonStyle="btn--primary--solid"
						buttonSize="btn--medium"
						onClick={() => handleLogin(fbProvider)}
					>
						Đăng nhập bằng Facebook
					</Button>
				</div>
			</div>
		</div>
	);
}
