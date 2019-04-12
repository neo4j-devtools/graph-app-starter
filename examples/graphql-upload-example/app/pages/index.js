import Page from '../components/Page'
import Section from '../components/Section'
import UploadBlob from '../components/UploadBlob'
import UploadFile from '../components/UploadFile'
import Uploads from '../components/Uploads'

const IndexPage = () => (
  <Page title="Apollo upload examples">
    <Section heading="Upload Files">
      <UploadFile />
    </Section>
    <Section heading="Upload Blob">
      <UploadBlob />
    </Section>
    <Section heading="Uploads">
      <Uploads />
    </Section>
  </Page>
)

export default IndexPage
