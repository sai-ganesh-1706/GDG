

const isAdminUser = (req,res, next) => {
    if(req.userInfo.role !== 'admin'){// req.userInfo userInfo comes from auth-middleware as we call first auth middleware
        return res.status(403).json({
            success : false,
            message : 'Access denied! Admin rights required'
        })
    }

    next();
}

module.exports = isAdminUser;
