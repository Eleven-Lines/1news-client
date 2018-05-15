import { Router } from 'express'

import users from './users'
import { searchTweets } from '../..//lib/twitter'

const router = Router()

router.get('/news', async (req, res, next) => {
  const {statuses} = await searchTweets(`#${req.query.tag}`, 100)
  res.json(statuses.map((status) => {
    const filteredStatus = {}
    const filteredUser = {}
    const referenceStatus = status.quoted_status || status

    filteredUser.id = referenceStatus.user.id
    filteredUser.name = referenceStatus.user.name
    filteredUser.screen_name = referenceStatus.user.screen_name
    filteredUser.profile_image_url = referenceStatus.user.profile_image_url_https

    filteredStatus.id = referenceStatus.id
    filteredStatus.created_at = referenceStatus.created_at
    filteredStatus.text = referenceStatus.text
    filteredStatus.media_url = referenceStatus.entities.media ? referenceStatus.entities.media[0].media_url_https : null
    filteredStatus.user = filteredUser

    return filteredStatus
  }))
})

// Add USERS Routes
router.use(users)

export default router
