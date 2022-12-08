import { Input, Button, Flex, Spacer, Box, Checkbox, DeleteIcon, IconButton } from 'native-base';
import { useState } from 'react';
import { FlatList, StyleSheet, Switch, TextInput } from 'react-native';
import uuid from 'react-uuid';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

interface todoList {
  key: string,
  value: string,
  status: boolean,
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [text, setText] = useState('');
  const [list, setList] = useState<todoList[]>([]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo-List</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" ></View> */}
      <View style={styles.textInputContainer}>
      <Input 
        w="100%" 
        py="0" 
        value={text} 
        onChangeText={(v) => {setText(v)}}  
        InputRightElement={
          <Button size="xs" rounded="none" w="1/6" h="full" onPress={()=> {
            if (text === '') return;
            setList(current => [...current,{key:uuid(), value: text, status:false }])
            setText('');
            }}>
           Add
          </Button>} 
        placeholder="Text" 
        />

      {/* <Input w={'100%'}  style={styles.input} placeholder="Task" value={text} onChangeText={(v) => {setText(v)}}/>
      <TextInput style={styles.input} placeholder="Task" value={text} onChangeText={(v) => {setText(v)}}/>
      <Button title="Add" onPress={()=> {
        if (text === '') return;
        setList(current => [...current,{key:uuid(), value: text, status:false }])
        setText('');
        }}/> */}
      </View>
        <FlatList style={{width:'100%'}} keyExtractor={item => item.key} data={list}  renderItem={({item}) =>
        <Flex flexDirection={'row'} alignItems="center" my={'3'} >
            <Box justifyContent={'center'} h={'100%'} paddingX={'2'} style={{flexGrow:10,}} bg={'primary.500'} rounded='lg' _text={{
              fontSize: 'md',
              color: "warmGray.50",
              fontWeight: "medium"
            }}
            >{item.value}
            </Box>
            <Spacer/>
            <IconButton colorScheme={'danger'} onPress={()=> setList(list.filter((v) => v.key !== item.key))} icon={<DeleteIcon size='6'/>}></IconButton>
            <Spacer/>
            <Checkbox colorScheme="green" isChecked={item.status} onChange={() => setList(list.map((v) => v.key === item.key ? { key: item.key, value: item.value, status: !item.status } : v))} value={''}></Checkbox>
        </Flex>
          }>
        </FlatList>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width:'100%'
  },
  textInputContainer: {
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  toDoContainer: {
    flexWrap:'wrap',
    padding:10,
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  textInput: {
    borderColor: 'gray', borderBottomWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
