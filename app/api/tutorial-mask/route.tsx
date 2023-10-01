import {
  ImageResponse,
  NextRequest,
} from "next/server"



export const GET = async (req: NextRequest) => {

  const imageMask = (
    <div></div>
  )

  return new ImageResponse(
    imageMask
  )
}
