export const ACCESS_TO_ALL_TUTORIALS = "Access to all tutorials";
export const DOWNLOAD_ALL_TUTORIALS_SOURCE_CODE = "Download all tutorials' source code";
export const ACCESS_TO_ALL_COURSES = "Access to all courses";
export const DOWNLOAD_ALL_COURSES_SOURCE_CODE = "Download all courses' source code";

export interface FeatureDesc {
    isAvailable: boolean;
    desc: string;
}

export interface MembershipDesc {
    features: FeatureDesc[]
}

export const STANDARD_MEMBERSHIP: MembershipDesc = {
    features: [
        {
            isAvailable: true,
            desc: ACCESS_TO_ALL_TUTORIALS
        } as FeatureDesc,
        {
            isAvailable: false,
            desc: DOWNLOAD_ALL_TUTORIALS_SOURCE_CODE
        } as FeatureDesc,
        {
            isAvailable: false,
            desc: ACCESS_TO_ALL_COURSES
        } as FeatureDesc,
        {
            isAvailable: false,
            desc: DOWNLOAD_ALL_COURSES_SOURCE_CODE
        } as FeatureDesc,
    ]
} as MembershipDesc;

export const BEGINNER_MEMBERSHIP: MembershipDesc = {
    features: [
        {
            isAvailable: true,
            desc: ACCESS_TO_ALL_TUTORIALS
        } as FeatureDesc,
        {
            isAvailable: true,
            desc: DOWNLOAD_ALL_TUTORIALS_SOURCE_CODE
        } as FeatureDesc,
        {
            isAvailable: false,
            desc: ACCESS_TO_ALL_COURSES
        } as FeatureDesc,
        {
            isAvailable: false,
            desc: DOWNLOAD_ALL_COURSES_SOURCE_CODE
        } as FeatureDesc,
    ]
} as MembershipDesc;

export const PROFESSIONAL_MEMBERSHIP: MembershipDesc = {
    features: [
        {
            isAvailable: true,
            desc: ACCESS_TO_ALL_TUTORIALS
        } as FeatureDesc,
        {
            isAvailable: true,
            desc: DOWNLOAD_ALL_TUTORIALS_SOURCE_CODE
        } as FeatureDesc,
        {
            isAvailable: true,
            desc: ACCESS_TO_ALL_COURSES
        } as FeatureDesc,
        {
            isAvailable: true,
            desc: DOWNLOAD_ALL_COURSES_SOURCE_CODE
        } as FeatureDesc,
    ]
} as MembershipDesc;