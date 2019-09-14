import React from 'react';
import axios from 'axios';
import { Flex, Box } from 'reflexbox/styled-components';
import Logo from './components/ui/Logo';
import LoadingIndicator from './components/ui/LoadingIndicator';
import ErrorMessage from './components/ui/ErrorMessage';
import Steps from './components/ui/Steps';
import Card from './components/ui/Card';
import Input from './components/ui/Input';
import Button from './components/ui/Button';
import Layout from './components/ui/Layout';
import Text from './components/ui/Text';

const electron = window.require("electron");
const dialog = electron.remote.dialog;
const shell = electron.remote.shell;

const BASE_URL = 'http://localhost:3600';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
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
      .catch(error => {
        this.setState({ error: error.response.data.error, loading: false })
      });
  }

  handleLink = ({ target }) => {
    const { downloadOptions } = this.state;

    if (target.value) {
      this.setState({ step: 2 });
    }

    this.setState({ downloadOptions: { ...downloadOptions, youtubeLink: target.value } });
  }

  handleDialog = () => {
    if (dialog) {
      const dialogPath = dialog.showOpenDialogSync({
        properties: ['openDirectory']
      });

      if (dialogPath) {
        const { downloadOptions } = this.state;

        this.setState({ step: 3, downloadOptions: { ...downloadOptions, downloadPath: dialogPath[0].replace(/\\/g,"/") } });
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
      <Steps steps={['URL', 'Location', 'Download']} activeStep={this.state.step} />
    </Flex>
  );

  renderInput = () => (
    <Input
      type="text" 
      label="YouTube Video URL" 
      onChange={this.handleLink} 
      placeholder="Enter video URL here" 
    />
  );

  renderBrowseFile = () => {
    const { downloadOptions } = this.state;

    return (
      <React.Fragment>
        <Flex justifyContent="center">
          <Button color="#ddd" textColor="black" onClick={this.handleDialog}>
            Browse
          </Button>
        </Flex>
        {downloadOptions.downloadPath && (
          <Text small>
            📍 Location: {downloadOptions.downloadPath}
          </Text>
        )}
      </React.Fragment>
    );
  };

  renderLoadingAndError = () => {
    const { loading, error } = this.state;

    return (
      <React.Fragment>
        {error && <ErrorMessage error={error} />}
        {loading && (
          <Flex justifyContent="center">
            <LoadingIndicator color="red" />
          </Flex>
        )}
      </React.Fragment>
    );
  };

  renderDownloadAction = () => {
    const { loading } = this.state;
    
    return (
      <Flex justifyContent="center">
        <Button mt="30px" onClick={this.handleDownload} color={loading ? 'grey' : ''}>
          {loading ? 'Loading' : 'Download'}
        </Button>
      </Flex>
    );
  }

  renderData = () => {
    const { data } = this.state;

    if (!data) return null;

    return (
      <React.Fragment>
        <Flex mt={3} alignItems="center" flexDirection="column">
          <Text>
            Complete!
          </Text>
          <Button color="#282828" textColor="white" onClick={this.handleOpenFile}>
            Open MP3
          </Button>
        </Flex>
        <Box m={2}>
          {data.thumbnail && <img width="350px" height="200px" src={data.thumbnail} alt="thumbnail" />}
        </Box>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Layout>
        {this.renderHeader()}
        {this.renderSteps()}
        <Card>
          {this.renderInput()}
          {this.renderBrowseFile()}
          {this.renderLoadingAndError()}
          {this.renderDownloadAction()}
          {this.renderData()}
        </Card>
      </Layout>
    );
  }
}

export default App;
