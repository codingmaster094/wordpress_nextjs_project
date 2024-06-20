import Link from "next/link";
import Image from "next/image";

export default function FeaturedImage({post}){
    let img =''
    const defaultFeaturedImage = "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg"
    const defaultFeaturedwidth = '300'
    const defaultFeaturedheight = '300'

    if(post.featuredImage){
        let size = post.featuredImage.node.mediaDetails.sizes[0]
        img = {
            src : size.sourceUrl,
            width : size.width,
            height : size.height,
        }
    }else{
        img = {
            src : defaultFeaturedImage,
            width : defaultFeaturedwidth,
            height : defaultFeaturedheight
        }
    }

    return (
        <Link href={`/Blog/${post.slug}`}>
                <Image className='h-full object-cover rounded-xl' src={img.src} width={img.width} height={img.height} alt={img.title} />
        </Link>
    )
}