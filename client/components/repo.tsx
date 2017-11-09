import * as React from 'react'
import { RepoDiv } from '../styles/repo_styles'
import { BackButton } from '../styles/globals'
import { api } from '../utils/api'



interface RepoProps extends React.Props<any> {
  history: {
    goBack: Function,
  },
  location?: {
    state: {
      login: string,
      name: string,
    },
  }
}
  
interface RepoState {
  repo: {
    login: string,
    name: string,
  },
  repository?: object,
  error?: object[]
}

export class Repo extends React.Component<RepoProps, RepoState> {
  private goBack: React.Props<History>|any
  public state: RepoState

  constructor(props: RepoProps) {
    super(props)
    console.log(props)
    if (props.location) {
      this.state = {
        repo: props.location.state,
      } 
    }

    this.goBack = () =>  props.history.goBack()
    
  }

  componentDidMount() {
    const { login, name } = this.state.repo

    api.getClickedRepository(login, name)
      .then(results => this.setState({ repository: results.data.repository, error: results.errors }))
  }

  
  render() {
    console.log(this.state)
    if (this.state && this.state.repo) {
      return(
        <RepoDiv>
            <div style={{ width: '100%' }}>
                <BackButton onClick={this.goBack}>Back</BackButton>
            </div>
        </RepoDiv>
      )
    }
    return (
      <RepoDiv>
        <h1>NO REPOSITORY SELECTED PLEASE GO BACK</h1>
        <BackButton onClick={this.goBack}>Back</BackButton>
      </RepoDiv>
    )
  }
}