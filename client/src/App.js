import React from 'react';
import axios from 'axios';
import { Flex, Box } from 'reflexbox/styled-components';
import styled from 'styled-components';
import waves from './waves.svg';
import Logo from './components/ui/Logo';
import LoadingIndicator from './components/ui/LoadingIndicator';
import ErrorMessage from './components/ui/ErrorMessage';
import Steps from './components/ui/Steps';
import Card from './components/ui/Card';
import Input from './components/ui/Input';

const electron = window.require("electron");
const dialog = electron.remote.dialog;
const shell = electron.remote.shell;

const TextLabel = styled.p`
  color: black;
  margin: 0px;
  font-size: ${props => props.small ? '12px' : 'inherit'};
`;

const Layout = styled.div`
  background: url("${waves}") no-repeat;
  background-size: 100%;
  background-position: bottom;
  background-color: white;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
`;

const Button = styled.button`
  border: 1px solid black;
  outline: none;
  padding: 10px 25px;
  border-radius: 3px;
  font-size: 15px;
  background-color: ${props => props.color || 'red'};
  color: ${props => props.textColor || 'white'};
  margin: 10px;
  margin-top: ${props => props.mt || '10px'};
`;

// const Input = styled.input`
//   outline: 0;
//   border: 1px solid black;
//   margin: 30px;
//   padding: 10px 20px;
//   border-radius: 3px;
//   width: 50%;
// `;

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

  renderHeader = () => (
    <Flex width={1} justifyContent="flex-start" alignItems="flex-start">
      <Box ml={3} mt={3} width="100px">
        <Logo />
      </Box>
    </Flex>
  )

  renderSteps = () => (
    <Flex>
      <Steps steps={['URL', 'Location', 'Download']} />
    </Flex>
  );

  render() {
    const { data, error, loading, downloadOptions } = this.state;

    return (
      <div>
        <Layout>
          {this.renderHeader()}
          {this.renderSteps()}
          <Card>
            <Input type="text" label="YouTube Video URL" onChange={this.handleLink} placeholder="Enter video URL here" />
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
            {error && <ErrorMessage error={error.message} />}
            {loading && (
              <Flex justifyContent="center">
                <LoadingIndicator color="red" />
              </Flex>
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
          </Card>
          {/* <img width="100%" src={waves} className="App-bg" alt="waves" /> */}
        </Layout>
      </div>
    );
  }
}

export default App;
