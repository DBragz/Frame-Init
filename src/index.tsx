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
  console.log(deriveState)
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
          { status !== "initial" && state.highschoolMascot !== "" ? 
              "Enter your college mascot" 
              : "Enter your highschool mascot" }
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Mascot" />,
      <Button>Set</Button>,
      status !== "initial" && state.highschoolMascot !== "" && <Button.Reset>Clear</Button.Reset>
    ],
  })
})

devtools(app, { serveStatic })
