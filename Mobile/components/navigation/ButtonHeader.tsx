import React, { FC } from 'react'
import { Pressable } from 'react-native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const ButtonHeader: FC<{ navigation: any }> = ({ navigation }) => {
	return (
		<Pressable onPress={() => navigation.navigate('Settings')}>
			<Material name='cog' size={20} />
		</Pressable>
	)
}

export default ButtonHeader
