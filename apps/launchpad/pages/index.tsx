import { Layout } from '@apps/home-layout'
import { Main } from '@apps/home/main'
import { Overview } from '@apps/home/overview'
import { WhyUs } from '@apps/home/whyus'

export function Index() {
  return (
    <Layout>
      <Main />
      <Overview />
      <WhyUs />
    </Layout>
  )
}

export default Index
