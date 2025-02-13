import { FC } from "react";
import mook from "../moock/resources.json"
import avatar_user_post from "../assets/avatar_post.svg"
const ItaResources: FC = () => {
  const resources = mook.resources.map(resource => {
    return {
      ...resource,
      user: {
        ...resource.user,
        photoURL: avatar_user_post
      }
    }
  })
  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="py-4 text-4xl">Recursos  React.js</h2>
      <div className="flex flex-col gap-2">
        {resources.map(resource => (
          <div key={resource.resource_id} className="border-2 border-black ">
            <div className="flex gap-2 w-full justify-between  p-4">
              <span className="inline-flex"><strong>{resource.votes}</strong></span>
              <div className="flex flex-col flex-1 gap-2">
                <h3 className="p-4 text-2xl">{resource.title}</h3>
                <p className="p-4">{resource.description}</p>
              </div>
              <i className="inline-flex ">{resource.favorite ? '💕' : '❤'}</i>
            </div>
            <div className="flex gap-2 items-center w-full px-10  py-4">
              {resource.user &&
                <div className="flex gap-2 items-center">
                  <img src={resource.user.photoURL} alt="User avatar" />
                  <h3>{resource.user.displayName}</h3>
                </div>}
              <span>{resource.create_at}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItaResources