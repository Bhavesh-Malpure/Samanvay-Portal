import {
  AlertCircle,
  CheckCircle2,
  ImagePlus,
  Send,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

const MAX_IMAGES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const initialForm = {
  title: "",
  description: "",
  category: "",
  location: "",
  landmark: "",
};

function ProblemForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const addImages = (files) => {
    const selectedFiles = Array.from(files);

    if (selectedFiles.length === 0) {
      return;
    }

    const remainingSlots = MAX_IMAGES - images.length;

    if (remainingSlots <= 0) {
      setErrors((current) => ({
        ...current,
        images: `You can upload a maximum of ${MAX_IMAGES} images.`,
      }));
      return;
    }

    const filesToProcess = selectedFiles.slice(0, remainingSlots);

    const validFiles = [];
    const imageErrors = [];

    filesToProcess.forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        imageErrors.push(
          `${file.name}: Only JPG, PNG and WEBP images are allowed.`
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        imageErrors.push(
          `${file.name}: Image size must be 5 MB or less.`
        );
        return;
      }

      const alreadyExists = images.some(
        (image) =>
          image.file.name === file.name &&
          image.file.size === file.size
      );

      if (alreadyExists) {
        return;
      }

      validFiles.push(file);
    });

    if (imageErrors.length > 0) {
      setErrors((current) => ({
        ...current,
        images: imageErrors[0],
      }));
    } else {
      setErrors((current) => ({
        ...current,
        images: "",
      }));
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImages((current) => [
          ...current,
          {
            id: `${file.name}-${file.lastModified}-${Math.random()}`,
            file,
            preview: event.target.result,
          },
        ]);
      };

      reader.readAsDataURL(file);
    });

    if (selectedFiles.length > remainingSlots) {
      setErrors((current) => ({
        ...current,
        images: `Only ${MAX_IMAGES} images can be uploaded.`,
      }));
    }
  };

  const handleFileInput = (event) => {
    addImages(event.target.files);

    // Allows selecting the same file again after removing it.
    event.target.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    addImages(event.dataTransfer.files);
  };

  const removeImage = (imageId) => {
    setImages((current) =>
      current.filter((image) => image.id !== imageId)
    );

    setErrors((current) => ({
      ...current,
      images: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Please enter a problem title.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Please describe the problem.";
    }

    if (!form.category) {
      newErrors.category = "Please select a category.";
    }

    if (!form.location.trim()) {
      newErrors.location = "Please enter the location.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const submissionData = {
      ...form,

      // Files are kept here so the backend can later
      // upload them using multipart/form-data.
      images: images.map((image) => image.file),

      submittedAt: new Date().toISOString(),
    };

    console.log("Problem submitted:", submissionData);

    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Problem Title */}
      <div>
        <label
          htmlFor="problem-title"
          className="text-sm font-semibold"
        >
          Problem Title
        </label>

        <input
          id="problem-title"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Frequent power cuts in my area"
          className="mt-2 w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] focus:ring-2 focus:ring-[#E2B4BD]/30"
        />

        <FieldError message={errors.title} />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="problem-category"
          className="text-sm font-semibold"
        >
          Category
        </label>

        <select
          id="problem-category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm text-[#4A4A4A] outline-none transition focus:border-[#4A4A4A] focus:ring-2 focus:ring-[#E2B4BD]/30"
        >
          <option value="">Select a category</option>
          <option value="Electricity">Electricity</option>
          <option value="Water & Sanitation">
            Water & Sanitation
          </option>
          <option value="PWD & Roads">
            PWD & Roads
          </option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Environment">Environment</option>
          <option value="Other">Other</option>
        </select>

        <FieldError message={errors.category} />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="problem-description"
          className="text-sm font-semibold"
        >
          Problem Description
        </label>

        <textarea
          id="problem-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={6}
          placeholder="Describe what is happening, who is affected and how frequently it occurs..."
          className="mt-2 w-full resize-none rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm leading-6 text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] focus:ring-2 focus:ring-[#E2B4BD]/30"
        />

        <FieldError message={errors.description} />
      </div>

      {/* Location */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="problem-location"
            className="text-sm font-semibold"
          >
            Location
          </label>

          <input
            id="problem-location"
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Deopur, Dhule"
            className="mt-2 w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm text-[#4A4A4A] outline-none placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] focus:ring-2 focus:ring-[#E2B4BD]/30"
          />

          <FieldError message={errors.location} />
        </div>

        <div>
          <label
            htmlFor="problem-landmark"
            className="text-sm font-semibold"
          >
            Nearby Landmark
          </label>

          <input
            id="problem-landmark"
            type="text"
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            placeholder="Optional"
            className="mt-2 w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] px-4 py-3 text-sm text-[#4A4A4A] outline-none placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] focus:ring-2 focus:ring-[#E2B4BD]/30"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <label className="text-sm font-semibold">
              Problem Images
            </label>

            <p className="mt-1 text-xs text-[#4A4A4A]/50">
              Add photos that help explain or verify the problem.
            </p>
          </div>

          <span className="text-xs font-medium text-[#4A4A4A]/45">
            {images.length}/{MAX_IMAGES}
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />

        {/* Upload area */}
        {images.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mt-3 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
              isDragging
                ? "border-[#4A4A4A] bg-[#F7D6D0]"
                : "border-[#E2B4BD] bg-[#FFF5F5] hover:border-[#4A4A4A] hover:bg-[#F7D6D0]/50"
            }`}
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl transition ${
                isDragging
                  ? "bg-[#E2B4BD]"
                  : "bg-[#F7D6D0]"
              }`}
            >
              {isDragging ? (
                <Upload size={24} />
              ) : (
                <ImagePlus size={24} />
              )}
            </div>

            <p className="mt-4 text-sm font-semibold">
              {isDragging
                ? "Drop your images here"
                : "Upload images of the problem"}
            </p>

            <p className="mt-2 text-xs text-[#4A4A4A]/50">
              Drag & drop or click to browse
            </p>

            <p className="mt-1 text-[11px] text-[#4A4A4A]/40">
              JPG, PNG or WEBP · Maximum 5 MB per image · Up to 3 images
            </p>
          </button>
        )}

        {/* Image previews */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl border border-[#E2B4BD]/50 bg-[#FFF5F5]"
              >
                <img
                  src={image.preview}
                  alt={`Problem evidence ${image.file.name}`}
                  className="h-44 w-full object-cover"
                />

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#4A4A4A] text-white opacity-100 shadow-sm transition hover:scale-105 hover:opacity-90"
                  aria-label={`Remove ${image.file.name}`}
                >
                  <X size={16} />
                </button>

                {/* Image information */}
                <div className="bg-white px-3 py-3">
                  <p className="truncate text-xs font-medium">
                    {image.file.name}
                  </p>

                  <p className="mt-1 text-[10px] text-[#4A4A4A]/45">
                    {formatFileSize(image.file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add another image */}
        {images.length > 0 && images.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#E2B4BD] bg-white px-4 py-2.5 text-xs font-semibold transition hover:bg-[#F7D6D0]"
          >
            <ImagePlus size={15} />
            Add another image
          </button>
        )}

        {/* Image error */}
        {errors.images && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-[#E2B4BD]/60 bg-[#F7D6D0]/50 px-4 py-3">
            <AlertCircle
              size={16}
              className="mt-0.5 shrink-0"
            />

            <p className="text-xs font-medium">
              {errors.images}
            </p>
          </div>
        )}

        {/* Upload confirmation */}
        {images.length > 0 && !errors.images && (
          <div className="mt-3 flex items-center gap-2 text-xs text-[#4A4A4A]/55">
            <CheckCircle2 size={14} />
            {images.length} image
            {images.length > 1 ? "s" : ""} ready to upload
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="border-t border-[#E2B4BD]/30 pt-6">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A4A4A] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
        >
          <Send size={17} />
          Submit Problem
        </button>
      </div>
    </form>
  );
}

function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#4A4A4A]">
      <AlertCircle size={13} />
      {message}
    </p>
  );
}

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default ProblemForm;