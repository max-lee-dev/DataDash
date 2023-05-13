import React from 'react';
import AddTrackerButton from './AddTrackerButton';
import { Center, Box, HStack, VStack, Text, Button} from "@chakra-ui/react"
const Dashboard = () => {
    return (
    <Box paddingTop='50px'  minHeight='60vh'>
        <Text fontSize='24px'>Dashboard</Text>
        
        <Box className='floating'>
            <AddTrackerButton/>
        </Box>
    </Box>


    );
};

export default Dashboard;