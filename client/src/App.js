import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const electron = window.require("electron");
const dialog = electron.remote.dialog;
const shell = electron.remote.shell;

const TextLabel = styled.p`
  color: white;
  margin: 0px;
  font-size: ${props => props.small ? '12px' : 'inherit'};
`;

const Layout = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
`;

const Button = styled.button`
  border: 0;
  outline: none;
  padding: 10px 25px;
  border-radius: 3px;
  font-size: 15px;
  background-color: ${props => props.color || 'red'};
  color: ${props => props.textColor || 'white'};
  margin: 10px;
  margin-top: ${props => props.mt || '10px'};
`;

const Input = styled.input`
  outline: 0;
  border: 1px solid red;
  margin: 30px;
  padding: 10px 20px;
  border-radius: 3px;
  width: 50%;
`;

const Error = styled(TextLabel)`
  margin-top: 10px;
`;

const LoadingIndicator = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  margin: 10px 0px;
  
  & .path {
    stroke: white;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const BASE_URL = 'http://localhost:3600';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: false,
      error: null,
      downloadOptions: {},
    };

    this.queryManager = axios.create({ baseURL: BASE_URL });
  }

  handleDownload = () => {
    const { downloadOptions } = this.state;

    this.setState({ loading: true, error: null, data: null });

    if (!downloadOptions.youtubeLink) {
      this.setState({ error: 'No YouTube URL provided', loading: false })
      return;
    }

    if (!downloadOptions.downloadPath) {
      this.setState({ error: 'No download path provided', loading: false })
      return;
    }

    axios
      .post(`${BASE_URL}/api/download`, downloadOptions)
      .then(({ data: { data } }) => this.setState({ data, loading: false, error: null }))
      .catch(error => this.setState({ error, loading: false }));
  }

  handleLink = ({ target }) => {
    const { downloadOptions } = this.state;

    this.setState({ downloadOptions: { ...downloadOptions, youtubeLink: target.value } });
  }

  handleDialog = () => {
    if (dialog) {
      const dialogPath = dialog.showOpenDialogSync({
        properties: ['openDirectory']
      });

      if (dialogPath) {
        const { downloadOptions } = this.state;

        this.setState({ downloadOptions: { ...downloadOptions, downloadPath: dialogPath[0].replace(/\\/g,"/") } });
      }
    }
  }

  handleOpenFile = () => {
    const { data } = this.state;

    if (data && shell) {
      shell.showItemInFolder(data.file);
    }
  }

  render() {
    const { data, error, loading, downloadOptions } = this.state;

    return (
      <div>
        <Layout>
          <TextLabel>
            YouTube Video URL
          </TextLabel>
          <Input type="text" onChange={this.handleLink} />
          <TextLabel>
            Save MP3 Location
          </TextLabel>
          <Button color="white" textColor="black" onClick={this.handleDialog}>
            Browse
          </Button>
          {downloadOptions.downloadPath && (
            <TextLabel small>
              📍 Location: {downloadOptions.downloadPath}
            </TextLabel>
          )}
          {error && (
            <Error>
              ⚠️ ERROR: {error.message}
            </Error>
          )}
          {loading && (
            <LoadingIndicator viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="4"
              />
            </LoadingIndicator>
          )}
          <Button mt="30px" onClick={this.handleDownload} color={loading ? 'grey' : ''}>
            {loading ? 'Loading' : 'Download'}
          </Button>
          {data && (
            <React.Fragment>
              <div>
                Complete!
                <Button onClick={this.handleOpenFile}>Open MP3 Location</Button>
              </div>
              <div style={{ margin: '20px' }}>
                {data.thumbnail && <img width="350px" height="200px" src={data.thumbnail} alt="thumbnail" />}
              </div>
            </React.Fragment>
          )}
        </Layout>
      </div>
    );
  }
}

export default App;
