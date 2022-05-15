import React from 'react';
import {Row, Col, Button, Typography} from 'antd';
import firebase, {auth, db} from '../../firebase/config';
import {addDocument, generateKeywords} from '../../firebase/services';
const {Title} = Typography;

// const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function Login(){
	const handleLogin = async (provider) => {
		const {additionalUserInfo, user} = await auth.signInWithPopup(provider);
		let users = await db
			.collection('users')
			.where('email', '==',additionalUserInfo?.profile.email)
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
		<div>
			<Row justify='center' style={{height: 800}}>
				<Col span={8}>
					<Title style={{textAlign: 'center'}} level={3}>
						Fun Chat
					</Title>
					<Button
						style={{width: '100%', marginBottom: 5}}
						onClick={() => handleLogin(googleProvider)}
					>
						Đăng nhập bằng Google
					</Button>
					{/*<Button*/}
					{/*  style={{ width: '100%' }}*/}
					{/*  onClick={() => handleLogin(fbProvider)}*/}
					{/*>*/}
					{/*  Đăng nhập bằng Facebook*/}
					{/*</Button>*/}
				</Col>
			</Row>
		</div>
	);
}
