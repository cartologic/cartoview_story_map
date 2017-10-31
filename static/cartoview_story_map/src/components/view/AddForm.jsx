import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { PropsTable, Slider } from './statelessComponents'
import Button from 'material-ui/Button'
import Collapsible from './CollapsibleItem'
import CommentsList from './CommentsList'
import Divider from 'material-ui/Divider'
import ImageDialog from './ImageUploadDialog'
import { Message } from './statelessComponents'
import PropTypes from 'prop-types'
import React from 'react'
import { commentsPropTypes } from './sharedPropTypes'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui-icons/ArrowBack';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import WFSClient from '../../utils/WFSClient.jsx'
import { getCRSFToken } from '../../helpers/helpers.jsx'


const styles = theme => ( {
    root: {
        background: theme.palette.background.paper,
        padding: theme.spacing.unit * 2
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: "80%",
        marginLeft: "10%",
        height: "auto",
    
    },
    loadingCenter: {
        textAlign: 'center'
    },
    pagination: {
        [ theme.breakpoints.down( 'md' ) ]: {
            marginBottom: 40,
        },
    },
    searchMargin: {
        marginBottom: theme.spacing.unit * 2
    },
    flex: {
        flex: 1
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 200,
      },
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
} )
class addForm extends React.Component {
    constructor( props ) {
        super( props )
        this.state={
            formValue:{}
        }
    }
    WFS = new WFSClient(this.props.urls)
    componentDidMount(){
        console.log(this.props)
    }
    getType=(type)=>{
        var result=""
        if(type=="string")
        {result=""}
        else if(type=="int"||type=='long'||type=='double')
        {result="number"}
        else if (type=="datetime"){
            result="datetime-local"
        }
return result
    }
    handleChange = attr => event =>{
        this.state.formValue[attr]=event.target.value
        // this.setState({
        //     this.state.[attr]: event.target.value,
        //   });
    }
    save=()=>{
console.log( "geomertry",this.props.geometry)
             this.WFS.insertFeature(this.props.config.layer, this.state.formValue, this.props.geometry).then(res =>
             res.text()).then((xml) => {console.log(xml)})
    }
    render() {
        console.log(this.props)
        const {
            selectedFeature,
            searchFilesById,
            classes,
            back,
            searchCommentById,
            addComment,
            username,
            SaveImageBase64,
            featureTypes
        } = this.props
        return (
            <div>
                 <IconButton className={classes.button} aria-label="Delete" onClick={() => back()} >
                 <BackIcon />
               </IconButton>
              <div>
                  {
                      featureTypes&&featureTypes.map((feature,i)=>{
                          if(feature.localType!="boolean"&&feature.localType!="Point"){
                          return   <TextField   key={i}
                                                fullWidth
                                                required={!feature.nillable}
                                                type={this.getType(feature.localType)}
                                                id={feature.name}
                                                label={feature.name}
                                                className={classes.textField}
                                                onChange={this.handleChange(feature.name)}
                                                margin="normal"
                                                />
                      }
                    else if(feature.localType=="boolean"){
                        return  <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={"true"}
                                        onChange={this.handleChange(feature.name)}
                                        value="checkedA"
                                        />
                                    }
                                    label={feature.name}
                                         />

                    }
                    })
                  }
                   <Button raised color="primary" onClick={this.save } className={classes.button} style={{float:"right"}}>
        Save
      </Button>
              </div>
                <div className={classes.textCenter}>
                  
                </div>
            </div>
        )
    }
}
// ItemDetails.propTypes = { ...commentsPropTypes,
    // searchFilesById: PropTypes.func.isRequired,
    // back: PropTypes.func.isRequired,
    // searchCommentById: PropTypes.func.isRequired,
    // username: PropTypes.string.isRequired,
    // SaveImageBase64: PropTypes.func.isRequired,
// }
export default withStyles( styles )( addForm )
