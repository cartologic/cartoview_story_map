import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import { FeatureListComponent } from './statelessComponents'
import {getdescribeFeatureType} from '../../containers/staticMethods'
import ItemDetails from "./ItemDetails"
import AddForm from "./AddForm"
import React from 'react'
import SearchInput from './SearchInput'
import UltimatePaginationMaterialUi from './MaterialPagination'
import { cartoviewListPropTypes } from './sharedPropTypes'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Snackbar from 'material-ui/Snackbar';
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
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
} )
class CartoviewList extends React.Component {
    state = {
        currentPage: 1,
        detailsModeEnabled: false,
        detailsOfFeature: null,
        add:false,
        featureTypes:null,
        success:false
    }
    back = () => {
        const {
            selectionModeEnabled,
            featureIdentifyResult,
            addStyleToFeature
        } = this.props
        this.setState( { detailsModeEnabled: false, detailsOfFeature: null,add:false } )
        if ( selectionModeEnabled ) {
            addStyleToFeature( featureIdentifyResult )
        } else {
            addStyleToFeature( [] )
        }
    }
    openDetails = ( state ) => {
        this.setState( { ...state }, () => this.addStyleZoom() )
    }
    addStyleZoom = () => {
       
        const { zoomToFeature, addStyleToFeature } = this.props
        const { detailsOfFeature } = this.state
        // addStyleToFeature( [ detailsOfFeature ] )
        zoomToFeature( detailsOfFeature )
    }
    componentWillMount(){
        const allFeature=this.props.getFeatures(0)
       getdescribeFeatureType(this.props.config.layer).then(data=>{this.setState({featureTypes:data})})
    }
 componentWillReceiveProps(nextProps){
 
     this.setState({add:nextProps.addEntry})
 }
 handleClose=()=>{
    this.setState({ success: false })
  }
handleOpen=()=>{
this.setState({success:true})
}
    render() {
        const  vertical= 'bottom', horizontal='center'
        
        const {
            classes,
            featuresIsLoading,
            config,
            totalFeatures,
            attachmentIsLoading,
            getFeatures,
            selectionModeEnabled,
            searchFilesById,
            backToAllFeatures,
            featureIdentifyResult,
            featureIdentifyLoading,
            search,
            comments,
            searchCommentById,
            addComment,
            SaveImageBase64,
            addEntry,
            handleSwitch
        } = this.props

        let { detailsModeEnabled, detailsOfFeature ,add} = this.state
        return (
            <div className={classes.root}>
                {config.filters && <div className={classes.searchMargin}>
                    <SearchInput openDetails={this.openDetails} search={search} config={config} addStyleZoom={this.addStyleZoom} searchFilesById={searchFilesById} />
                    <Divider />
                </div>}
                {!selectionModeEnabled && !detailsModeEnabled &&!add &&<FeatureListComponent {...this.props} subheader="All Features" loading={featuresIsLoading} openDetails={this.openDetails} addEntry={this.addEntry} message={"No Features Found"} />}
                {!selectionModeEnabled && !detailsModeEnabled && add &&<AddForm  {...this.props} subheader="All Features" featureTypes={this.state.featureTypes} loading={featuresIsLoading} openDetails={this.openDetails} handleOpen={this.handleOpen} addEntry={this.addEntry} back={this.back}  message={"No Features Found"} />}
                
                {detailsModeEnabled && detailsOfFeature && <ItemDetails SaveImageBase64={SaveImageBase64} username={config.username} addComment={addComment} selectionModeEnabled={selectionModeEnabled} back={this.back} selectedFeature={detailsOfFeature} searchCommentById={searchCommentById} comments={comments} searchFilesById={searchFilesById} />}
                {!selectionModeEnabled && !detailsModeEnabled && !(featuresIsLoading || attachmentIsLoading) && totalFeatures > 0 && <div className={classes.pagination}>
                            </div>}
                            <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={this.state.success}
          onRequestClose={ this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Feature created Successfully</span>}
        />
            </div>
        )
    }
}
CartoviewList.propTypes = cartoviewListPropTypes
export default withStyles( styles )( CartoviewList )
