const getStaticImg = (name)=>{
  return new URL(`../../public/assets/${name}.png`, import.meta.url).href
}
export default getStaticImg