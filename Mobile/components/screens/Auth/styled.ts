import styled from 'styled-components/native'

export const Container = styled.View`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 5px;
`

export const TextBig = styled.Text`
	font-size: 26px;
	color: #000;
`

export const TextNormal = styled.Text`
	font-size: 18px;
	color: #000;
`

export const TextSmall = styled.Text`
	font-size: 12px;
	color: #000;
`

export const CustomInput = styled.TextInput`
	padding: 5px;
	border-width: 1px;
	border-style: solid;
	border-color: rgb(82, 149, 204);
	border-radius: 10px;
	width: 200px;
`

export const LogInButton = styled.Button`
	display: flex;
	flex-direction: column;
	padding: 10px;
	border-bottom-style: solid;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 35px;
	border-bottom-color: rgb(82, 149, 204);
	border-bottom-width: 2px;
`
