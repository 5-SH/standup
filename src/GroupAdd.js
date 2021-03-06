import React,{Component} from 'react';
import config from './config';
import './GroupAdd.css';
import FirebaseDao from './FirebaseDao';
import Dropzone from 'react-dropzone'
import imageUpload from './FileUtil';

class GroupAdd extends Component {
  constructor(props) {
    super(props);
    this.dao = new FirebaseDao(config);
    this.state = {
      groupImage: undefined,
      isSpin: false,
      groupName: "",
      groupNameUnique: false
    }
  }

  groupNameChanged(event) {
    let checkText = event.currentTarget.textContent;
    if (event.keyCode===13 && checkText) {
      this.submit();
    } else {
      this.setState({
        groupName : checkText,
        groupNameUnique :false
      });
    }
  }

  submit() {
    // console.log(this.state.groupName,
    //   this.state.groupImage,
    //   this.state.groupNameUnique);

    if (this.state.groupNameUnique) {
      if (this.state.groupName && 
        this.state.groupImage) {
        this.dao.addGroup({
          name : this.state.groupName,
          logoUrl : this.state.groupImage,
          owner : {
            email : this.dao.currentUser.email,
            displayName :this.dao.currentUser.displayName,
            photoURL : this.dao.currentUser.photoURL
          }
        }).then(name => {
          // browserHistory.push('/groups/'+ name);
          alert('그룹이 생성 되었습니다.');
          this.props.popGroupAdd(false);
        }).catch(e => { console.log(e) });
      }
      else {
        alert('그룹이름과 이미지를 지정해 주셔야 합니다.');
      }
    } else {
      alert('그룹이름 중복체크를 해주세요.');
    }
  }

  checkGroups(){
    if (this.state.groupName && this.state.groupName!=="") {
      this.dao.isValidGroup(this.state.groupName).then(exists => {
        if (exists) {
          alert("존재하는 그룹입니다.");
          this.setState({ groupNameUnique:false });
        } else {
          alert("가능한 이름입니다.");
          this.setState({groupNameUnique:true});
        }
      }).catch(err => {
        console.log(err);
      });
    } else {
      alert("그룹 이름을 지정해 주세요.");
    } 
  }

  onDrop (acceptedFiles, rejectedFiles) {
    if(rejectedFiles && rejectedFiles.length  > 0) {
      alert(rejectedFiles[0].name  +" 파일은 이미지가 아닙니다 ");
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      this.setState({
        isSpin: true
      });
      imageUpload(acceptedFiles, 1, downloadUrl => {
        this.setState({
          groupImage: downloadUrl,
          isSpin: false
        });
      });
    } else {
      this.setState({
        isSpin: false
      });
    }
  }

  render() {
    return (
      <div className="group-add">
        <div className="wrap-title">
          <i onClick={ () => this.props.popGroupAdd(false) } 
            className="fa fa-times float-right fa-lg green" ></i>
          <div className="group-add-title "
             contentEditable="true"
             placeholder="그룹명을 입력하세요"
             onKeyUp={ (e) => this.groupNameChanged(e) }
             dangerouslySetInnerHTML={ { __html: this.state.groupName } }
             ></div>
          <button onClick={ () => this.checkGroups() } 
            className="check-exists button-reverse">
            { this.state.groupNameUnique &&
              <i className="fa fa-check-circle-o"></i>
            }
            중복 확인
          </button>

        </div>
        {this.state.groupImage &&
          <img src={ this.state.groupImage } className="drop-file" alt={ this.state.groupName }/>
        }
        {this.state.isSpin &&
        <i className="fa fa-spinner fa-2x green" ></i>
        }
        {!this.state.groupImage && !this.state.isSpin &&
          <Dropzone 
            onDrop={(acceptedFiles, rejectedFiles) => this.onDrop(acceptedFiles, rejectedFiles)} 
            accept="image/*" 
            className="drop-file padding-top">
            {({getRootProps, getInputProps, isDragActive, isDragReject}) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive && 'Click here or drop a file to upload!'}
                {isDragReject && "File type not accepted, sorry!"}
              </div>
            )}
          </Dropzone>
        }
        <button onClick={ () => this.submit() }>새 그룹 생성</button>
      </div>
    )
  }
}

export default GroupAdd;