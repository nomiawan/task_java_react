// import axios from 'axios';

// import React,{Component} from 'react';

// class UploadDocument extends Component {

// 	state = {
// 	file: null
// 	};
// 	onFileChange = event => {
// 	this.setState({ file: event.target.files[0] });
	
// 	};
	
// 	onFileUpload = () => {
	
// 	const formData = new FormData();
	
// 	formData.append(
// 		"file",
// 		this.state.file,
// 		this.state.file.name
// 	);
	
// 	console.log(this.state.file);
	
// 	axios.post("http://localhost:8080/uploadFile", formData);
// 	};
	
// 	fileData = () => {
// 	if (this.state.file) {
		
// 		return (
// 		<div className="text-white">
// 			<h2>File Details:</h2>
// 			<p>File Name: {this.state.file.name}</p>
// 			<p>File Type: {this.state.file.type}</p>
// 			<p>Last Modified:{" "}{this.state.file.lastModifiedDate.toDateString()}</p>
// 			<p>File Size: {this.state.file.size}</p>
// 		</div>
// 		);
// 	} else {
// 		return (
// 		<div>
// 			<br />
// 			<h4 className="text-white">Choose before Pressing the Upload button</h4>
// 		</div>
// 		);
// 	}
// 	};
	
// 	render() {
// 	const {
// 		file
// 	} = this.state
// 	return (
// 		<div className="container pt-5 file">
// 			<h1 className="text-center text-white">Upload Document</h1>
// 			<input className="form-control" type="file" onChange={this.onFileChange} />
// 			< br/>
// 			<button className="btn btn-success" onClick={this.onFileUpload}>
// 			Upload!
// 			</button>
// 		{this.fileData()}
// 		</div>
// 	);
// 	}
// }

// export default UploadDocument;


// class UploadDocument extends React.Component {
//     render () {
//         return (
//             <div class="container pt-5 file">
//                 <h1 className="text-center text-white">Upload Document</h1>
//                 <input class="form-control" type="file" id="formFile"/>
//             </div>
//         )
//     }
// }
// export default UploadDocument

import React, {useState} from 'react';

const UploadDocument = () => {
	const [url,setUrl] = useState();
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
	const handleSubmission = () => {
		alert("Upload data successfully to the backend!!")
		const formData = new FormData();

		formData.append('file', selectedFile);

		fetch(
			'http://localhost:8080/uploadFile',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
				setUrl(result.fileDownloadUri);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return(
		<div className="container pt-5">
				<h1 className="text-center text-white">Upload Document</h1>
				 <input className="form-control" type="file" name="file" onChange={changeHandler} />
				 {isFilePicked ? (
					 <div className="text-white">
						 <p>Filename: {selectedFile.name}</p>
						 <p>Filetype: {selectedFile.type}</p>
						 <p>Size in bytes: {selectedFile.size}</p>
						 <p>
							 lastModifiedDate:{' '}
							 {selectedFile.lastModifiedDate.toLocaleDateString()}
						 </p>
					 </div>
				 ) : (
					 <h3 className="text-white mt-2">Select a file to show details</h3>
				 )}
				 <div>
					 <button className="btn btn-success" onClick={handleSubmission}>Upload</button>
					 <br/><br/>
					<a className="btn btn-success" href={url} target="_blank">Generate Download Link</a>
				 </div>
			 </div>
		 )
}
export default UploadDocument