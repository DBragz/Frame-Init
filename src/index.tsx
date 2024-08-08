import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { verifying } from 'hono/utils/jwt/jws'
// import { neynar } from 'frog/hubs'

import { vars } from './ui'

type State = {
  highschoolMascot?: string,
  collegeMascot?: string,
}

export const app = new Frog<{ State: State }>({
  ui: { vars },
  title: 'Mascot Merger',
  initialState: {
    highschoolMascot: "",
    collegeMascot: "",
  },
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  const { status, inputText, deriveState } = c
  
  console.log()
  console.log(JSON.stringify(c))
  console.log(status)
  console.log(inputText)
  console.log()

  if (status === 'initial' && (deriveState as State).highschoolMascot !== "") {
    (deriveState as State).highschoolMascot = ""
  }

  const state:State = deriveState(previousState => {
    if (inputText !== undefined) {
      if (previousState.highschoolMascot !== "") {
        previousState.collegeMascot = inputText
        console.log(`College mascot: ${inputText}`)
      } else {
        previousState.highschoolMascot = inputText
        console.log(`Highschool mascot: ${inputText}`)
      }
    }
  })

  console.log()
  console.log(state)
  console.log()

  if (inputText !== undefined && state.highschoolMascot !== "" && state.collegeMascot !== "") {
    return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background:'linear-gradient(to right, #432889, #17101F)',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              marginTop: 30,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
            }}
          >
            { 'Generating Image ⏳' }
          </div>
        </div>
      ),
      intents: [
        <Button.Reset>Reset</Button.Reset>
      ],
    })
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          backgroundSize: '100% 100%',
          backgroundImage: `url(https://wallpapercave.com/wp/dIRfYNy.jpg)`,
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            marginTop: '100',
            marginRight: '250',
            marginLeft: '10',
          }}
        >
          { status !== 'initial' && state.highschoolMascot !== '' ? 
              'Enter your college mascot' 
              : 'Enter your highschool mascot' }
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder='Mascot' />,
      <Button>Set</Button>,
      status !== 'initial' && state.highschoolMascot !== '' && <Button.Reset>Clear</Button.Reset>
    ],
  })
})

devtools(app, { serveStatic })
