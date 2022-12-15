import React, { useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { IconButton } from "@mui/material";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";


const boxStyle = {
  margin: "50px, 0px,2px,50px",
  padding: "40px",
};

const Form = () => {
  const [inputData, setInputData] = useState({
    id: 0,
    title : ""
  });
  const [error, setError] = useState("");
  const [remainingTask, setRemainingTask] = useState([]);
  const [completeTask, setCompleteTask] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputData.id)
    {
      const NewData = remainingTask.map((item)=>{
       if(inputData.id === item.id)
       {
        return item.title = inputData.title
       } 
       return item
      })
      console.log("🚀 ~ file: Form.jsx ~ line 57 ~ NewData ~ NewData", NewData)
    }

    else if (inputData.title.length > 5 && inputData.title !== "") {
      setRemainingTask([...remainingTask,{
        id :Math.random(),
        title : inputData.title
      }]);
    }
    setInputData({
      id: 0,
      title: ""
    })
  };

  const handleChange = ({ target }) => {
    target.value.length <= 5
      ? setError("Task atleast should have 5 character")
      : setError("");
    setInputData({...inputData,["title"] : target.value}); 
  };

  const handleUpdate = (id) => {

    const NewValues = remainingTask.filter((item) => {
        return item.id === id
    	
    })
    setInputData({id: NewValues[0].id , title : NewValues[0].title})
  };


  const handleCheck = (id) => {
    const init = [...remainingTask];
    const initCompleteTask = [...completeTask];
    const currentTime = getCurrentTime(new Date());

    const Index = init.findIndex((item) => {
      return item.id === id;
    });

    remainingTask[Index].currentTime = currentTime;

    initCompleteTask.push(remainingTask[Index]);

    //for deleting the updated task
    const updatedRemainigTask = init.filter((item) => item.id !== id);
    setRemainingTask(updatedRemainigTask);

    //For updating the completing task
    setCompleteTask(initCompleteTask);
  };

  const handleDelete = (id) => {
    const init = [...remainingTask];
    const upadte = init.filter((item) => item.id !== id);
    setRemainingTask(upadte);
  };

  const getCurrentTime = (date) => {
    let Hour = date.getHours();
    let Minutes = date.getMinutes();
    let TimeZone = Hour >= 12 ? "pm" : "am";

    //formatting date structure
    Hour = Hour % 12;
    Hour = Hour ? Hour : 12;
    Minutes = Minutes < 10 ? "0" + Minutes : Minutes;

    let currentTime = Hour + " : " + Minutes + TimeZone;
    return currentTime;
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Box style={boxStyle}>
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: "50px" }}>
              <form onSubmit={handleSubmit} sx={{ padding: "10px" }}>
                <Box sx={{ justifyContent: "center" }}>
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ color: "indigo", marginBottom: "30px" }}
                  >
                    TODO APP
                  </Typography>
                  <Grid container justifyContent="center">
                    <Grid item xs={8}>
                      <TextField
                        id="imputField"
                        label="Enter to add the task"
                        variant="outlined"
                        fullWidth={true}
                        size="small"
                        value={inputData.title}
                        onChange={handleChange}
                        error={error ? true : false}
                        helperText={error}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6} lg={6} sx={{ maxWidth: "1140px" }}>
                <List
                  container
                  sx={{
                    backgroundColor: "white",
                    padding: "20px",
                    margin: "30px 0px",
                    minHeight: "300px",
                    height: "Auto",
                  }}
                  dense={true}
                >
                  <Typography
                    sx={{
                      paddingLeft: "20px",
                      color: "#4527a0",
                      textAlign: "left",
                    }}
                    variant="h5"
                  >
                    Remaining Task
                  </Typography>

                  {remainingTask.length > 0 ? (
                    remainingTask.map((item, i) => (
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{ backgroundColor: "#5c6bc0", color: "white" }}
                          >
                            {item.title[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.title} />
                        <ListItemSecondaryAction sx={{ display: "flex" }}>
                          <IconButton
                            sx={{ color: "green" }}
                            onClick={() => handleCheck(item.id)}
                          >
                            <DoneOutlineOutlinedIcon />
                          </IconButton>

                          <IconButton
                            sx={{ color: "#ef6c00" }}
                            onClick={() => handleUpdate(item.id)}
                          >
                            <UpdateIcon />
                          </IconButton>

                          <IconButton
                            sx={{ color: "red" }}
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#9fa8da",
                        textAlign: "center",
                        marginTop: "50px",
                      }}
                    >
                      No Task Added yet!..
                    </Typography>
                  )}
                </List>
              </Grid>
              <Grid item xs={6} sm={6} lg={6} sx={{ maxWidth: "1140px" }}>
                <List
                  container
                  sx={{
                    backgroundColor: "white",
                    padding: "20px",
                    margin: "30px 0px",
                    minHeight: "300px",
                    height: "Auto",
                  }}
                  dense={true}
                >
                  <Typography
                    sx={{
                      paddingLeft: "20px",
                      color: "#4527a0",
                      textAlign: "left",
                    }}
                    variant="h5"
                  >
                    Completed Task
                  </Typography>

                  {completeTask.length > 0 ? (
                    completeTask.map((item, i) => (
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{ backgroundColor: "#26a69a", color: "white" }}
                          >
                            {item.title[0]}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.title}
                          secondary={item.currentTime}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#9fa8da",
                        textAlign: "center",
                        marginTop: "50px",
                      }}
                    >
                      No Task Completed yet!..
                    </Typography>
                  )}
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Form;
