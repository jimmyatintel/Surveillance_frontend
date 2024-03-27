import React from "react";
import { useLocation } from "react-router-dom";
import "./index.css";
// import "../../Components/style.css";
import { Container, Row, Col, Nav, Form, Spinner, FloatingLabel, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
// import { getState, updateComment, getHSD, getInfo, getComment, moveStatus, getTimestamps } from "../../Api/logs"
// import { updateHSD, updateInfo, clearComment, resetDut, getlog } from "../../Api/admin"
// import { getStates } from "../../Api/monitor"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {useParams} from "react-router-dom";
// import Avatar from '@material-ui/core/Avatar';
// import Chip from '@material-ui/core/Chip';
// import SaveIcon from '@material-ui/icons/Save';
// import { Prev } from "react-bootstrap/esm/PageItem";
// import TagFacesIcon from '@material-ui/icons/TagFaces';
import Switch from '@material-ui/core/Switch';
import ChipsArray from './chip'
import NucChipsArray from './chipnuc'
import { addProject, getNUCstatus, getfreeze, removeProject, modifyfreeze, getlockednuc, get3strike, modify3strike } from "../functions/setting"
import { getproject,getreport } from "../functions/setting"
import { uploadfile,checktemplate,getCurrentDate,projectstatuschange} from "../functions/setting"
import ErrorIcon from '@material-ui/icons/Error';
import { red } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { get_ptoject_list, get_project_unit, project_start } from "../functions/main.js"
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formControl_right: {
    margin: theme.spacing(3),
    display: 'block'
  },
  button: {
    margin: theme.spacing(1),
  }, chip: {
    margin: theme.spacing(0.5),
  },
  container: {
    display: 'block',
    textAlign: 'left'
    // flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  card_root: {
    marginTop: 20,
    maxWidth: 200,
  },
  card_bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  card_title: {
    fontSize: 14,
  },
  card_pos: {
    marginBottom: 12, 
  },
}));
export default function Project_setting() {
  const classes = useStyles();
  let location = useLocation().pathname;
  const [Maillist, setMaillist] = React.useState([]);
  const [threestrike, setthreestrike] = React.useState(0);
  const [freezedetect, setfreezedetect] = React.useState(0);
  const [Mailaddress, setMailaddress] = React.useState();
  const [alert_Maillist, setalert_Maillist] = React.useState([]);
  const [assigned_machine, setassigned_machine] = React.useState(["null"]);
  const [alert_Mailaddress, setalert_Mailaddress] = React.useState([]);
  const onChangeLocation = (event) => {
    setMailaddress(event.target.value)
  }
  const onChangealter = (event) => {
    setalert_Mailaddress(event.target.value)
  }
  const {project} =useParams();
  const [ProjectName, setProjectName] = React.useState(project);

  const [AddHost, setaddHost] = React.useState();
  const onChangeProjectName = (event) => {
    setProjectName(event.target.value)
  }
  const [CodeNumber, setCodeNumber] = React.useState();
  const onChangeCodeNumber = (event) => {
    setCodeNumber(event.target.value)
  }
  const [Owner, setOwner] = React.useState();
  const onChangeOwner = (event) => {
    setOwner(event.target.value)
  }
  const [isfileloading, setisfileloading] = React.useState(false);
  const updatemail = () => {
    let len = Maillist.length
    setMaillist([...Maillist, { key: len, label: Mailaddress }]);
  };
  const updatealertmail = () => {
    let len = alert_Maillist.length
    setalert_Maillist([...alert_Maillist, { key: len, label: alert_Mailaddress }]);
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      projectstatuschange(project,"Search").then(res => {
        console.log(res.data)
        setrunStatus(res.data.status);
      });
    }, 5000);
  
    return () => {
      clearInterval(interval);
    };
  }, []); 
  React.useEffect(async () => {
    let code
    await getproject(project).then(res => {
      let cache = []
      let cache2 = []
      code = res.data.short_name
      setOwner(res.data.owner)
      setCodeNumber(res.data.short_name)
      // console.log(CodeNumber)
      res.data.Email_list.forEach(address => {
        let len = cache.length
        let len2 = cache2.length
        if (address.report){
          cache = cache.concat({ key: len, label: address.account })
        }
        if (address.alert){
          cache2 = cache2.concat({ key: len2, label: address.account })
        }
        // setMaillist([...Maillist, {key: len,label: address}]);
      })
      setMaillist(cache)
      setalert_Maillist(cache2)
      setProjectName(project)
    })
    getreport(code).then(async res => {
      setreporttime(res.data.lasttime_send+"T"+res.data.report_time_hour+":"+res.data.report_time_minut)
      setfilename(res.data.filename)
      setlastupload(res.data.uploaddate)
      console.log(reporttime)
      // setReport(res.data)
    })
    projectstatuschange(project,"Search").then(res => {
      console.log(res.data)
      setrunStatus(res.data.status);
    });
  }, []);
  React.useEffect(() => {
    // action on update of movies
    console.log(AddHost)
  }, [AddHost]);
  // React.useEffect( () => {
  //    
  // })
  React.useEffect(() => {
    get3strike(project).then(res => {
      if (res.data.status == 1){
        setthreestrike(true)
      }else{
        setthreestrike(false)
      }
    })
    get_project_unit(project).then(res => {
      setassigned_machine([])
      res.data.duts.map(async function (dut,i){
        setassigned_machine(assigned_machine => [...assigned_machine, dut.machine_name])
      })
    })
    getfreeze(project).then(res => {
      if (res.data.switch === 'open'){
        setfreezedetect(true)
      }else{
        setfreezedetect(false)
      }
    })
  },[])


  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'chi.lei.wang@intel.com' },
  ]);
  const childToParent = (childdata) => {
    setMaillist(childdata);
  }
  const childToParental = (childdata) => {
    setalert_Maillist(childdata);
  }
  // console.log("!")
  const [File, setFile] = React.useState([]);
  const [isupdating, setisupdating] = React.useState(false);
  const [isverify, setisverify] = React.useState(false);
  const [iserror, setiserrror] = React.useState(false);
  const [iscorrect, setiscorrect] = React.useState(false);
  const [errorcode, seterrorcode] = React.useState(0);
  const [reporttime, setreporttime] = React.useState(0);
  const [runStatus, setrunStatus] = React.useState(3);
  const [filename, setfilename] = React.useState("");
  const [lastupload, setlastupload] = React.useState("");
  const onChangereporttime = (event) => {
    setreporttime(event.target.value)
    console.log(event.target.value)
  }
  const onchangestrike = (event) => {
    setthreestrike(event.target.checked)
    modify3strike(project,event.target.checked)

  }
  const onchangefreeze = (event) => {
    setfreezedetect(event.target.checked)
    let status = modifyfreeze(project,event.target.checked)
  }
  const onChangeFile = (event) => {
    // console.log(event.target.files[0])
    if(event.target.files[0]){
      setisfileloading(true)
      setisupdating(true)
      setiserrror(false)
      setFile(event.target.files[0])
      uploadfile(event.target.files[0],project).then(res => {
        // console.log(res)
        if(res === "OK"){
          // setisfileloading(false)
          setisverify(true)
          setisupdating(false)
          checktemplate(event.target.files[0].name,project,CodeNumber).then(res => {
            // console.log(res)
            if(res === "success"){
              setisfileloading(false)
              setisverify(false)
              setisupdating(false)
              setiscorrect(true)
              setiserrror(false)
              getreport(project).then(async res => {
                setfilename(res.data.filename)
                setlastupload(res.data.uploaddate)
                // setReport(res.data)
              })
            }else{
              setisfileloading(false)
              setisverify(false)
              setisupdating(false)
              seterrorcode(res)
              setiserrror(true)
            }
          })
        }else{
          setisfileloading(false)
          setisverify(false)
          setisupdating(false)
          seterrorcode(res)
          setiserrror(true)
        }
      })
    }else{
      setisfileloading(false)
      setisverify(false)
      setisupdating(false)
      setiserrror(false)
      setiscorrect(false)
    }
  }
  const handleSuccess = () => {
    window.alert("Operation Success!");
  }
  const handleFail = () => {
    window.alert("Operation Fail!");
  }
  return (
    <div className="textform">
      <Row>
          <Row>
          </Row>
        <Col xs={8}>
          <Row>
          <Col xs={4}><h1 className="mb-3"> {project} </h1></Col>
            <Col xs={2}>
            { runStatus === 0 &&
                <Button variant="contained" disabled>
                  Offline
                </Button>
            }

            { runStatus === 1 &&
              <Button variant="contained" color="secondary">
              Waking
            </Button>
            }

            { runStatus === 2 &&
              <Button variant="contained" color="primary">
              Running
            </Button>
            }
            
            { runStatus === 3 &&
              <Button variant="contained" >
              Pending
            </Button>
            }
            </Col>
          <Col xs={4}>
          <ButtonGroup size="large" color="secondary" aria-label="large outlined primary button group">
          <Button className="" onClick={() => {
                      if (window.confirm("Do you want to wake all host?")) {
                        projectstatuschange(project,"Wake").then(() => {
                          handleSuccess()
                        }).catch(() => {
                          handleFail();
                        })
                      }}} disabled={runStatus!==0}>WAKE</Button>
          <Button className=""  onClick={() => {
                      if (window.confirm("Do you want to start capturing for this project?")) {
                        projectstatuschange(project,"Start").then(() => {
                          handleSuccess()
                        }).catch(() => {
                          handleFail();
                        })
                      }}} disabled={runStatus!==1&&runStatus!==3}>START</Button>
          <Button className="" onClick={() => {
                      if (window.confirm("Do you want to stop capturing for this project?")) {
                        projectstatuschange(project,"Stop").then(() => {
                          handleSuccess()
                        }).catch(() => {
                          handleFail();
                        })
                      }
                    }} disabled={runStatus===0}>STOP</Button>
          <Button onClick={() => {
                      if (window.confirm("Do you want to reset all host?")) {
                        projectstatuschange(project,"Reset").then(() => {
                          handleSuccess()
                        }).catch(() => {
                          handleFail();
                        })
                      }
                    }} disabled={runStatus!==2}>RESET</Button>
          </ButtonGroup>
        </Col>
          </Row>
          <Row className="input">
            <Col xs={10} >
              <TextField
                required
                id="outlined-required"
                label="Project name*"
                defaultValue={ProjectName}
                className="fill"
                onChange={onChangeProjectName}
              />
            </Col>
          </Row>
          <Row className="input">
            <Col xs={10} >
              <TextField id="outlined-basic" label="Code number" variant="filled" className="fill" onChange={onChangeCodeNumber} value={CodeNumber} defaultValue=" " />
            </Col>
          </Row>
          <Row className="input">
            <Col xs={10} >
              <TextField id="outlined-basic" label="Owner" variant="filled" className="fill" onChange={onChangeOwner} value={Owner} defaultValue=" " />
            </Col>
          </Row>
          <Row className="input">
            <Col xs={10} >
              <TextField id="outlined-basic" label="Add Report Email" variant="filled" onChange={onChangeLocation} className="fill" />
            </Col>
            <Col xs={1}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={updatemail}
              // startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Col>
          </Row>
          <div className="maillist">
            <Col xs={10} >
              <ChipsArray key={String(Maillist)} Maillist={Maillist} childToParent={childToParent} />
            </Col>
          </div>
          <Row className="input">
            <Col xs={10} >
              <TextField id="outlined-basic" label="Add Alert Email" variant="filled" onChange={onChangealter} className="fill" />
            </Col>
            <Col xs={1}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={updatealertmail}
              // startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Col>
          </Row>
          <div className="maillist">
            <Col xs={10} >
              <ChipsArray key={String(alert_Maillist)} Maillist={alert_Maillist} childToParent={childToParental} />
            </Col>
          </div>
          <Row className="mt-5">
            <Col xs={6} >
              <Button
                variant="contained"
                component="label"
                // className="mt-5"
              >
                <input
                  type="file"
                  onChange={onChangeFile}
                  
                />
              </Button>
            </Col>
            <Col xs={3}>
              {isupdating?
              <div>Uploading the template...
              </div>:null
              }
              {isverify?
              <div>Checking the template...
              </div>:null
              }
              {
                iserror?
                <div>
                <div>Upload Fail.</div><div>Error code: {errorcode}</div></div>:null
              }
              {
                iscorrect?
                <div>
                  All correct!
                </div>:null
              }
            </Col>
            <Col xs={1}>
              {isfileloading?
              <div className="spinner-container">
              <div className="loading-spinner">
              </div>
            </div>:null
              }
              {iserror?
              <div>
                <ErrorIcon style={{  fontSize: 50,color: red[500]}}></ErrorIcon>
              </div>:null
              }
              {iscorrect?
              <div>
                <CheckIcon style={{  fontSize: 50,color: green[500]}}></CheckIcon>
              </div>:null
              }
            </Col>
            <Col>
   
            </Col>
          </Row>
          <Row className="input mb-5">
            <Col xs={3}>
              <Button variant="contained" color="primary" className="subbutton" onClick={() => addProject(ProjectName, CodeNumber, Owner, Maillist, alert_Maillist,reporttime)}>
                Submit
              </Button>
            </Col>
            <Col xs={3}>
              <Button variant="contained" color="primary" className="subbutton" onClick={() => removeProject(ProjectName)}>
                Remove
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={4}>
        <Col xs={8} >
        DUT in this Project
        <NucChipsArray key={String(assigned_machine)} Maillist={assigned_machine}/>
        </Col>
          <FormControl component="fieldset" className={classes.formControl_right}>
            <FormGroup>
              <FormControlLabel
                control={<Switch
                  checked={threestrike}
                  onChange={onchangestrike}
                  name="strike"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />}
                label="3-Strike"
              />
              <FormControlLabel
                control={<Switch
                  checked={freezedetect}
                  onChange={onchangefreeze}
                  name="freeze"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />}
                label="freeze detection"
              />
            </FormGroup>
          </FormControl>
          {/* <div className="fixbox"></div> */}
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Next Report Appointment"
              type="datetime-local"
              value={reporttime}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangereporttime}
            />
          </form>
          <Card className={classes.card_root}>
            <CardContent>
              <Typography className={classes.card_title} color="textSecondary" gutterBottom>
                Last updated file:
              </Typography>
              <Typography variant="h5" component="h2">
                {filename}
              </Typography>
              <Typography className={classes.card_pos} color="textSecondary">
                Date:
              </Typography>
              <Typography variant="body2" component="p">
                {lastupload}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
