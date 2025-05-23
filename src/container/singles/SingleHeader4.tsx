import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import React, { FC } from 'react'
import SingleTitle from './SingleTitle'
import PostMeta2 from '@/components/PostMeta2/PostMeta2'
import SingleMetaAction2 from './SingleMetaAction2'
import NcImage from '@/components/NcImage/NcImage'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import { FragmentTypePostFullFields } from '../type'

export interface SingleHeader4Props {
	hiddenDesc?: boolean
	className?: string
	post: FragmentTypePostFullFields
}

const SingleHeader4: FC<SingleHeader4Props> = ({
	hiddenDesc = false,
	className = '',
	post,
}) => {
	const {
		title,
		excerpt,
		ncPostMetaData,
		categories,
		commentCount,
		databaseId,
		uri,
		featuredImage,
	} = getPostDataFromPostFragment(post || {})

	return (
		<>
			<div className={`nc-SingleHeader4 ${className}`}>
				<div className="dark mx-auto max-w-5xl space-y-5">
					<CategoryBadgeList
						itemClass="!px-3"
						categories={categories?.nodes || []}
					/>
					<SingleTitle
						mainClass="text-neutral-900 font-bold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl 2xl:text-6xl dark:text-neutral-100"
						title={title || ''}
					/>
					{!hiddenDesc && (
						<div
							dangerouslySetInnerHTML={{ __html: excerpt }}
							className="block break-words pb-1 text-base text-neutral-500 md:text-lg dark:text-neutral-400"
						></div>
					)}
				</div>

				{/* FEATURED IMAGE */}
				<NcImage
					alt={title || ''}
					containerClassName="my-10 relative"
					className="w-full rounded-lg shadow-xl"
					src={featuredImage?.sourceUrl || ''}
					width={featuredImage?.mediaDetails?.width || 1000}
					height={featuredImage?.mediaDetails?.height || 750}
					sizes="(max-width: 1024px) 100vw, 1280px"
					enableDefaultPlaceholder
					priority
				/>

				<div className="space-y-10">
					<div className="flex flex-col justify-between space-y-5 sm:flex-row sm:items-end sm:space-x-5 sm:space-y-0 rtl:space-x-reverse">
						<PostMeta2
							size="large"
							className="flex-shrink-0 leading-none"
							hiddenCategories
							avatarRounded="rounded-full shadow-inner"
							post={{ ...post }}
						/>
						<SingleMetaAction2 post={{ ...post }} />
					</div>
					<div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
				</div>
			</div>
		</>
	)
}

export default SingleHeader4
