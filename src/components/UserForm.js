import handleFileUpload from '../utils/uploadHandler';

function UserForm(props) {


    return (
        <div className="upload-file">
            <label>Upload {props.title}:
            </label>
            <input type="file" name="contestants" accept='.csv, .xlsx' onChange={(e) => { handleFileUpload(e, props.stateHandler, props.uploadType) }} />

        </div>
    );

}

export default UserForm;
