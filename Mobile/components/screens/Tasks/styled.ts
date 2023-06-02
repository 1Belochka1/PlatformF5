import styled from 'styled-components/native'

export const TaskView = styled.View`
	display: flex;
	flex-direction: column;
	padding: 10px;
	border-bottom-style: solid;
	border-bottom-left-radius: 30px;
	border-bottom-right-radius: 30px;
	border-bottom-color: rgb(82, 149, 204);
	border-bottom-width: 2px;
`

export const ButtonView = styled.View`
	display: flex;
	flex-direction: column;
	gap: 5px;
`

export const ButtonPressable = styled.Pressable`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border-style: solid;
	border-radius: 30px;
	border-color: rgb(82, 149, 204);
	border-width: 2px;
`

export const ButtonText = styled.Text`
	font-size: 18px;
`
