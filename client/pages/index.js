import { useState, useRef } from "react";
import axios from "axios";
// import { diskStorage } from "multer";

const uri = `http://localhost:3000`;

export default function PrivatePage(props) {
  const [csv, setCsv] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const inputRef = useRef();

  const uploadToClient = event => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setCsv(event);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  console.log(csv);

  const uploadToServer = () => {
    return async function(req, res) {
      try {
        let form = new FormData()
        form.append('file')
        const input = inputRef?.current;
        const file = input.files;
    
        const response = axios.post(`${uri}`, {
          file
        })
        console.log(form, `<<<form`);
      } catch (error) {
        console.log(error);
      }
    }

    // console.log(input.files, `<<<input`);

  };

  return (
    <div>
      <div>
        <img src={createObjectURL} />
        <h4>Select Csv</h4>
        <input type="file" name="myCsv" onChange={uploadToClient} ref={inputRef}/>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer()}
        >
          Send to server
        </button>
      </div>
    </div>
  );
}
